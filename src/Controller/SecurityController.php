<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Facebook\Facebook;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class SecurityController extends Controller
{
    /** @var UserPasswordEncoderInterface */
    private $passwordEncoder;

    /** @var \Google_Client */
    private $googleClient;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder, \Google_Client $googleClient)
    {
        $this->passwordEncoder = $passwordEncoder;
        $this->googleClient = $googleClient;
    }

    /**
     * @Route("/api/login", name="api_login", defaults={"_format": "json"})
     * @Method({"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function login(Request $request)
    {
        $data = json_decode($request->getContent());

        if (!isset($data->username) || strlen($data->username) < 4) {
            return new JsonResponse((object)[
                'code' => 401,
                'message' => "Username must be at least 4 chars",
            ]);
        }
        if (!isset($data->password) || strlen($data->password) < 4) {
            return new JsonResponse((object)[
                'code' => 401,
                'message' => "Password must be at least 4 chars",
            ]);
        }

        try {
            $user = $this->getUserRepository()->loadUserByUsername($data->username);
            if (!$user || !$this->passwordEncoder->isPasswordValid($user, $data->password)) {
                return new JsonResponse((object)[
                    'code' => 401,
                    'message' => 'Bad credentials'
                ]);
            }
        } catch (\Exception $e){
            return new JsonResponse((object)[
                'code' => 500,
                'message' => $e->getMessage(),
            ]);
        }

        return new JsonResponse((object)[
            'token' => $this->getJwtManager()->create($user),
            'roles' => $user->getRoles(),
            'username' => $user->getUsername(),
        ]);
    }

    /**
     * @Route("/api/register", name="api_register", defaults={"_format": "json"})
     * @Method({"POST"})
     * @param Request $request
     * @param UserPasswordEncoderInterface $encoder
     * @return Response
     */
    public function register(Request $request, UserPasswordEncoderInterface $encoder)
    {
        $data = json_decode($request->getContent());

        if (!isset($data->email) || !filter_var($data->email, FILTER_VALIDATE_EMAIL)) {
            return new JsonResponse((object)[
                'code' => 401,
                'message' => "Invalid email",
            ]);
        }
        if (!isset($data->username) || strlen($data->username) < 4) {
            return new JsonResponse((object)[
                'code' => 401,
                'message' => "Username must be at least 4 chars",
            ]);
        }
        if (!isset($data->password) || strlen($data->password) < 4) {
            return new JsonResponse((object)[
                'code' => 401,
                'message' => "Password must be at least 4 chars",
            ]);
        }

        try {
            $usernameExists = $this->getUserRepository()->loadUserByUsername($data->username);
            $emailExists = $this->getUserRepository()->loadUserByUsername($data->email);

            if ($usernameExists || $emailExists) {
                return new JsonResponse((object)[
                    'code' => 409, //Conflict
                    'message' => "User already registered",
                ]);
            }

            /** @var User $user */
            $user = $this->createUser($data->username, $data->password, $data->email);
        } catch(\Exception $e) {
            return new JsonResponse((object)[
                'code' => 500,
                'message' => $e->getMessage(),
            ]);
        }

        return new JsonResponse((object)[
            'token' => $this->getJwtManager()->create($user),
            'roles' => $user->getRoles(),
            'username' => $user->getUsername(),
        ]);
    }

    /**
     * @Route("/api/login/facebook", name="api_login_facebook", defaults={"_format": "json"})
     * @Method({"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function facebookSignIn(Request $request)
    {
        /** @var Facebook $facebookClient */
        $facebookClient = $this->container->get('Facebook\Facebook');

        $data = json_decode($request->getContent());
        $response = $facebookClient
            ->get('/me?fields=email,name', $data->token->accessToken)
            ->getDecodedBody();

        /** @var User $user */
        $user = $this->getUserRepository()->loadUserByEmail($response['email']);
        if (!$user) {
            $user = $this->createUser(
                str_replace(' ', '', $response['name']),
                $response['email'].random_int(0,9999),
                $response['email']);
        }
        $jwtToken = $this->getJwtManager()->create($user);

        return new JsonResponse((object)[
            'token' => $jwtToken,
            'roles' => $user->getRoles(),
            'username' => $user->getUsername(),
        ]);
    }

    /**
     * @Route("/api/login/google", name="api_login_google", defaults={"_format": "json"})
     * @Method({"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function googleSignIn(Request $request)
    {
        $data = json_decode($request->getContent());
        $response = $this->googleClient->verifyIdToken($data->token->idToken);

        //@todo handle $response errors (hack attempts).

        /** @var User $user */
        $user = $this->getUserRepository()->loadUserByEmail($response['email']);
        if (!$user) {
            $user = $this->createUser(
                str_replace(' ', '', $response['name']),
                $response['email'].random_int(0,9999),
                $response['email']);
        }
        $jwtToken = $this->getJwtManager()->create($user);

        return new JsonResponse((object)[
            'token' => $jwtToken,
            'roles' => $user->getRoles(),
            'username' => $user->getUsername(),
        ]);
    }

    /**
     * @todo (this is dublicate method UserController:createUser)
     * @param $username
     * @param $password
     * @param $email
     * @param bool $enabled
     * @return User
     */
    private function createUser($username, $password, $email, $enabled = true)
    {
        $user = new User();
        $user
            ->setEnabled($enabled)
            ->setUsernameCanonical($username)
            ->setUsername($username)
            ->setPlainPassword($password)
            ->setEmailCanonical($email)
            ->setEmail($email);
        $user->setPassword($this->passwordEncoder->encodePassword($user, $password));
        $this->getDoctrine()->getManager()->persist($user);
        $this->getDoctrine()->getManager()->flush();

        return $user;
    }

    /**
     * @return UserRepository
     */
    private function getUserRepository()
    {
        return $this->getDoctrine()->getRepository(User::class);
    }

    /**
     * @return \Lexik\Bundle\JWTAuthenticationBundle\Services\JWTManager|object
     */
    private function getJwtManager()
    {
        return $this->get('lexik_jwt_authentication.jwt_manager');
    }
}