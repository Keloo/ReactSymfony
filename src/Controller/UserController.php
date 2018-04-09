<?php

namespace App\Controller;

use App\Entity\User;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserController extends Controller
{
    /** @var UserPasswordEncoderInterface */
    private $passwordEncoder;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
    }

    /**
     * @Route("/api/user/list", name="api_user_list", defaults={"_format": "json"})
     * @Method({"GET"})
     * @param Request $request
     * @return JsonResponse
     */
    public function listAction(Request $request)
    {
        $users = $this->getDoctrine()->getRepository(User::class)->findAll();

        return new JsonResponse($this->prepareUsersResponse($users));
    }

    /**
     * @Route("api/user", name="api_user_delete", defaults={"_format": "json"})
     * @Method({"DELETE"})
     * @param Request $request
     * @return JsonResponse
     */
    public function deleteAction(Request $request)
    {
        $data = json_decode($request->getContent());

        /** @var User $user */
        $user = $this->getDoctrine()->getRepository(User::class)->find($data->id);

        if ($user->getApartments()->count() > 0) {
            return new JsonResponse((object)[
                'code' => 401,
                'message' => "Cannot delete user that have apartments",
            ]);
        }

        $this->getDoctrine()->getManager()->remove($user);
        $this->getDoctrine()->getManager()->flush();

        return new JsonResponse();
    }

    /**
     * @Route("api/user", name="api_user_create", defaults={"_format": "json"})
     * @Method({"PUT"})
     * @param Request $request
     * @return JsonResponse
     */
    public function createAction(Request $request)
    {
        $data = json_decode($request->getContent());

        try {
            $this->createUser(
                $data->username,
                $data->password,
                $data->email,
                $data->enabled
            );
        } catch(\Exception $e) {
            return new JsonResponse((object)[
                'code' => 500,
                'message' => $e->getMessage(),
            ]);
        }

        return new JsonResponse();
    }

    /**
     * @Route("api/user/edit", name="api_user_edit", defaults={"_format": "json"})
     * @Method({"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function editAction(Request $request)
    {
        $data = json_decode($request->getContent());

        if (!isset($data->id)) {
            return new JsonResponse((object)[
                'code' => 401,
                'message' => "Please provide an user id",
            ]);
        }

        try {
            /** @var User $user */
            $user = $this->getDoctrine()->getRepository(User::class)->find($data->id);

            if (!$user) {
                return new JsonResponse((object)[
                    'code' => 401,
                    'response' => "User not found",
                ]);
            }

            $user
                ->setEnabled($data->enabled)
                ->setEmail($data->email)
                ->setEmailCanonical($data->email)
                ->setUsername($data->username)
                ->setUsernameCanonical($data->username)
                ->setRoles($data->roles);

            // set the password only if it is set!
            if (isset($data->password) && $data->password != '') {
                $user->setPlainPassword($data->password);
                $user->setPassword($this->passwordEncoder->encodePassword($user, $data->password));
            }

            $this->getDoctrine()->getManager()->persist($user);
            $this->getDoctrine()->getManager()->flush();
        } catch (\Exception $e) {
            return new JsonResponse((object)[
                'code' => 500,
                'message' => $e->getMessage(),
            ]);
        }

        return new JsonResponse();
    }

    /**
     * @todo (this is dublicate method SecurityController:createUser)
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
     * @param $users
     * @return array
     */
    private function prepareUsersResponse($users)
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
}