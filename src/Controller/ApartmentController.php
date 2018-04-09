<?php

namespace App\Controller;

use App\Entity\Apartment;
use App\Entity\User;
use App\Repository\ApartmentRepository;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\User\UserInterface;

class ApartmentController extends Controller
{
    /**
     * @Route("/api/apartment/list", name="api_apartment_list", defaults={"_format": "json"})
     * @Method({"GET"})
     * @param Request $request
     * @return JsonResponse
     */
    public function apartmentListAction(Request $request)
    {
        /** @var ApartmentRepository $apartmentRepository */
        $apartmentRepository = $this->getDoctrine()->getRepository(Apartment::class);

        $apartments = $apartmentRepository->findAll();

        return new JsonResponse($this->prepareApartmentsResponse($apartments));
    }

    /**
     * @Route("api/apartment/edit", name="api_apartment_edit", defaults={"_format": "json"})
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
                'message' => "Please provide an apartment id"
            ]);
        }

        /** @var Apartment $apartment */
        $apartment = $this->getDoctrine()->getRepository(Apartment::class)->find($data->id);

        if (!$apartment) {
            return new JsonResponse((object)[
                'code' => 401,
                'message' => "Apartment not found"
            ]);
        }

        if (!isset($data->user) || !isset($data->user->id)) {
            return new JsonResponse((object)[
                'code' => 401,
                'message' => "Please provide the apartment user"
            ]);
        }

        /** @var UserInterface $user */
        $user = $this->getDoctrine()->getRepository(User::class)->find($data->user->id);

        if (!$user) {
            return new JsonResponse((object)[
                'code' => 401,
                'message' => "User not found",
            ]);
        }

        try {
            $apartment
                ->setRoomCount($data->roomCount)
                ->setGpsLongitude($data->gpsLongitude)
                ->setGpsLatitude($data->gpsLatitude)
                ->setArea($data->area)
                ->setAvailable($data->available)
                ->setUser($user);

            $this->getDoctrine()->getManager()->persist($apartment);
            $this->getDoctrine()->getManager()->flush();
        } catch(\Exception $e) {
            return new JsonResponse((object)[
                'code' => 500,
                'message' => $e->getMessage(),
            ]);
        }

        return new JsonResponse();
    }

    /**
     * @Route("api/apartment", name="api_apartment_delete", defaults={"_format": "json"})
     * @Method({"DELETE"})
     * @param Request $request
     * @return JsonResponse
     */
    public function deleteAction(Request $request)
    {
        try {
            $data = json_decode($request->getContent());

            /** @var Apartment $apartment */
            $apartment = $this->getDoctrine()->getRepository(Apartment::class)->find($data->id);

            $this->getDoctrine()->getManager()->remove($apartment);
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
     * @Route("/api/apartment", name="api_apartment_create", defaults={"_format": "json"})
     * @Method({"PUT"})
     * @param Request $request
     * @return JsonResponse
     */
    public function createAction(Request $request)
    {
        $data = json_decode($request->getContent());

        if (!isset($data->user) || (!isset($data->user->username) && !isset($data->user->id))) {
            return new JsonResponse((object)[
                'code' => 401,
                'message' => "Can not create apartment without user"
            ]);
        }

        if (isset($data->user->id)) {
            $user = $this->getDoctrine()->getRepository(User::class)->find($data->user->id);
        } else {
            $user = $this->getDoctrine()->getRepository(User::class)
                ->loadUserByUsername($data->user->username);
        }

        if (!$user) {
            return new JsonResponse((object)[
                'code' => 401,
                'message' => "User not found",
            ]);
        }

        try {
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
        } catch (\Exception $e) {
            return new JsonResponse((object)[
                'code' => 500,
                'message' => $e->getMessage(),
            ]);
        }

        return new JsonResponse();
    }

    /**
     * @param $apartments
     * @return array
     */
    private function prepareApartmentsResponse($apartments)
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
}