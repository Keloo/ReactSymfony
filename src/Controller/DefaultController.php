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

    /**
     * @Route("/api/apartment", name="api_apartment_create")
     * @Method({"PUT"})
     * @param Request $request
     * @return JsonResponse
     */
    public function createApartment(Request $request)
    {
        $data = json_decode($request->getContent());

        $user = $this->getUserRepository()->find($data->user->id);
        if (!$user) {
            return new JsonResponse((object)[
                'code' => 401,
                'message' => "User not found",
            ]);
        }

        $apartment = new Apartment();
        $apartment
            ->setUser($user)
            ->setAvailable($data->available)
            ->setArea($data->area)
            ->setPricePerMonth($data->pricePerMonth)
            ->setRoomCount($data->roomCount)
            ->setGpsLatitude($data->gpsLatitude)
            ->setGpsLongitude($data->gpsLongitude);

        $this->getDoctrine()->getManager()->persist($apartment);
        $this->getDoctrine()->getManager()->flush();

        return new JsonResponse();
    }

    /**
     * @Route("api/apartment", name="api_apartment_delete")
     * @Method({"DELETE"})
     * @param Request $request
     * @return JsonResponse
     */
    public function deleteApartment(Request $request)
    {
        $data = json_decode($request->getContent());
        $apartment = $this->getApartmentRepository()->find($data->id);
        $this->getDoctrine()->getManager()->remove($apartment);
        $this->getDoctrine()->getManager()->flush();

        return new JsonResponse();
    }

    /**
     * @Route("api/apartment/edit", name="api_apartment_edit")
     * @Method({"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function editApartment(Request $request)
    {
        $data = json_decode($request->getContent());

        $apartment = $this->getApartmentRepository()->find($data->id);
        if (!$apartment) {
            return new JsonResponse((object)[
                'code' => 401,
                'message' => "Apartment not found"
            ]);
        }

        $user = $this->getUserRepository()->find($data->user->id);
        if (!$user) {
            return new JsonResponse((object)[
                'code' => 401,
                'message' => "User not found",
            ]);
        }

        $apartment
            ->setRoomCount($data->roomCount)
            ->setGpsLongitude($data->gpsLongitude)
            ->setGpsLatitude($data->gpsLatitude)
            ->setArea($data->area)
            ->setAvailable($data->available)
            ->setUser($user);

        $this->getDoctrine()->getManager()->persist($apartment);
        $this->getDoctrine()->getManager()->flush();

        return new JsonResponse((object)[
            'code' => 200,
        ]);
    }

    /**
     * @Route("api/user", name="api_user_delete")
     * @Method({"DELETE"})
     * @param Request $request
     * @return JsonResponse
     */
    public function deleteUser(Request $request)
    {
        $data = json_decode($request->getContent());
        $user = $this->getUserRepository()->find($data->id);
        $this->getDoctrine()->getManager()->remove($user);
        $this->getDoctrine()->getManager()->flush();

        return new JsonResponse();
    }

    /**
     * @Route("/api/register", name="api_register")
     * @Method({"POST"})
     * @param Request $request
     * @param UserPasswordEncoderInterface $encoder
     * @return Response
     */
    public function register(Request $request, UserPasswordEncoderInterface $encoder)
    {
        $data = json_decode($request->getContent());

        if (!filter_var($data->email, FILTER_VALIDATE_EMAIL)) {
            return new JsonResponse((object)[
                'code' => 401,
                'message' => "Invalid email",
            ]);
        }

        $usernameExists = $this->getUserRepository()->loadUserByUsername($data->username);
        $emailExists = $this->getUserRepository()->loadUserByUsername($data->email);

        if ($usernameExists || $emailExists) {
            return new JsonResponse((object)[
                'code' => 409, //Conflict
                'message' => "User already registered",
            ]);
        }
        $user = $this->createUser($data->username, $data->password, $data->email);

        return new JsonResponse((object)[
            'token' => $this->getJwtManager()->create($user),
            'roles' => $user->getRoles(),
            'username' => $user->getUsername(),
        ]);
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

    /**
     * @Route("/api/user/list", name="api_user_list")
     * @Method({"GET"})
     * @param Request $request
     * @return JsonResponse
     */
    public function users(Request $request)
    {
        $users = $this->getUserRepository()->findAll();
        return new JsonResponse($this->prepareUsersResponse($users));
    }

    protected function prepareUsersResponse($users)
    {
        $response = [];
        /** @var User $user */
        foreach ($users as $user) {
            $obj = (object)[
                'id' => $user->getId(),
                'username' => $user->getUsername(),
                'email' => $user->getEmail(),
                'roles' => $user->getRoles(),
                'enabled' => $user->getEnabled(),
            ];
            array_push($response, $obj);
        }

        return $response;
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
                'available' => $apartment->getAvailable(),
                'user' => (object)[
                    'id' => $apartment->getUser()->getId(),
                    'username' => $apartment->getUser()->getUsername(),
                ],
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

    private function getApartmentRepository()
    {
        return $this->getDoctrine()->getRepository(Apartment::class);
    }

    private function getJwtManager()
    {
        return $this->get('lexik_jwt_authentication.jwt_manager');
    }
}