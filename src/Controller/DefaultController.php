<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
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

    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
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
     */
    public function googleSignIn(Request $request)
    {
        /** @var \Google_Client $googleClient */
        $googleClient = $this->get('Google_Client');
        /** @var JWTManager $jwtManager */
        $jwtManager = $this->get('lexik_jwt_authentication.jwt_manager');
    }

    /**
     * @Route("/api/login", name="api_login")
     * @Method({"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function login(Request $request)
    {
        /** @var UserRepository $userRepository */
        $userRepository = $this->getDoctrine()->getRepository(User::class);
        /** @var JWTManager $jwtManager */
        $jwtManager = $this->get('lexik_jwt_authentication.jwt_manager');

        $data = json_decode($request->getContent());
        if (!$data->username) $data->username = "";
        if (!$data->password) $data->password = "";

        $user = $userRepository->loadUserByUsername($data->username);
        if (!$user || !$this->passwordEncoder->isPasswordValid($user, $data->password)) {
            return new JsonResponse((object)[
                'code' => 401,
                'message' => 'Bad credentials'
            ]);
        }

        return new JsonResponse((object)[
            'token' => $jwtManager->create($user),
            'roles' => $user->getRoles(),
        ]);
    }
}