<?php

namespace App\Controller;

use App\Entity\Apartment;
use App\Entity\User;
use App\Repository\ApartmentRepository;
use App\Repository\UserRepository;
use Facebook\Facebook;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTManager;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class DefaultController extends Controller
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
     * @Route("/", name="index")
     */
    public function indexAction()
    {
        return $this->render('index.html.twig', []);
    }

    /**
     * @Route("/test", name="test")
     */
    public function testAction()
    {
        return new JsonResponse("asdf");
    }

    public function register(Request $request, UserPasswordEncoderInterface $encoder)
    {
        $em = $this->getDoctrine()->getManager();
        $username = $request->request->get('_username');
        $password = $request->request->get('_password');
        $user = new User($username);
        $user->setPassword($encoder->encodePassword($user, $password));
        $em->persist($user);
        $em->flush();
        return new Response(sprintf('User %s successfully created', $user->getUsername()));
    }

    public function api()
    {
        return new Response(sprintf('Logged in as %s', $this->getUser()->getUsername()));
    }

    /**
     * @Route("/api/login/google", name="api_login_google")
     * @Method({"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function googleSignIn(Request $request)
    {
        $data = json_decode($request->getContent());
        $response = $this->googleClient->verifyIdToken($data->token->idToken);

        //handle $response errors (hack attempts).

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
     * @Route("/api/login/facebook", name="api_login_facebook")
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
     * @Route("/api/login", name="api_login")
     * @Method({"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function login(Request $request)
    {
        $data = json_decode($request->getContent());
        if (!$data->username) $data->username = "";
        if (!$data->password) $data->password = "";

        $user = $this->getUserRepository()->loadUserByUsername($data->username);
        if (!$user || !$this->passwordEncoder->isPasswordValid($user, $data->password)) {
            return new JsonResponse((object)[
                'code' => 401,
                'message' => 'Bad credentials'
            ]);
        }

        return new JsonResponse((object)[
            'token' => $this->getJwtManager()->create($user),
            'roles' => $user->getRoles(),
            'username' => $user->getUsername(),
        ]);
    }

    /**
     * @Route("/api/apartment/list", name="api_apartment_list")
     * @Method({"GET"})
     * @param Request $request
     * @return JsonResponse
     */
    public function apartments(Request $request)
    {
        /** @var ApartmentRepository $apartmentRepository */
        $apartmentRepository = $this->getDoctrine()->getRepository(Apartment::class);

        $apartments = $apartmentRepository->findAll();

        return new JsonResponse($this->prepareApartmentsResponse($apartments));
    }

    protected function prepareApartmentsResponse($apartments)
    {
        $response = [];
        /** @var Apartment $apartment */
        foreach ($apartments as $apartment) {
            $obj = (object)[
                'id' => $apartment->getId(),
                'area' => $apartment->getArea(),
                'pricePerMonth' => $apartment->getPricePerMonth(),
                'gpsLatitude' => $apartment->getGpsLatitude(),
                'gpsLongitude' => $apartment->getGpsLongitude(),
                'roomCount' => $apartment->getRoomCount(),
            ];
            array_push($response,$obj);
        }

        return $response;
    }

    /**
     * @param $username
     * @param $password
     * @param $email
     * @return User
     */
    private function createUser($username, $password, $email)
    {
        $user = new User();
        $user
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

    private function getUserRepository()
    {
        return $this->getDoctrine()->getRepository(User::class);
    }

    private function getJwtManager()
    {
        return $this->get('lexik_jwt_authentication.jwt_manager');
    }
}