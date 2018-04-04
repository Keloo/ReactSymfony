<?php

namespace App\DataFixtures;

use App\Entity\Apartment;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class ApartmentFixtures extends Fixture implements DependentFixtureInterface
{
    public function loadApartment1(ObjectManager $manager)
    {
        $apartment = new Apartment();
        $apartment
            ->setArea(70)
            ->setPricePerMonth(500)
            ->setGpsLatitude("40.712775")
            ->setGpsLongitude("-74.005973")
            ->setRoomCount(1)
            ->setUser($this->getReference(UserFixtures::REALTOR_USER_REFERENCE));
        $manager->persist($apartment);
        $manager->flush();
    }
    public function loadApartment2(ObjectManager $manager)
    {
        $apartment = new Apartment();
        $apartment
            ->setArea(40)
            ->setPricePerMonth(100)
            ->setGpsLatitude("40.717603")
            ->setGpsLongitude("-74.011522")
            ->setRoomCount(2)
            ->setUser($this->getReference(UserFixtures::REALTOR_USER_REFERENCE));
        $manager->persist($apartment);
        $manager->flush();
    }
    public function loadApartment3(ObjectManager $manager)
    {
        $apartment = new Apartment();
        $apartment
            ->setArea(100)
            ->setPricePerMonth(1000)
            ->setGpsLatitude("40.727882")
            ->setGpsLongitude("-73.982512")
            ->setRoomCount(4)
            ->setUser($this->getReference(UserFixtures::REALTOR_USER_REFERENCE));
        $manager->persist($apartment);
        $manager->flush();
    }

    public function load(ObjectManager $manager)
    {
        $this->loadApartment1($manager);
        $this->loadApartment2($manager);
        $this->loadApartment3($manager);
    }

    public function getDependencies()
    {
        return array(
            UserFixtures::class,
        );
    }
}
