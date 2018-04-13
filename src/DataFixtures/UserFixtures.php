<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFixtures extends Fixture
{
    public const ADMIN_USER_REFERENCE = 'admin-user';
    public const SIMPLE_USER_REFERENCE = 'simple-user';
    public const REALTOR_USER_REFERENCE = 'realtor-user';

    /** @var UserPasswordEncoderInterface */
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    private function createAdminUser(ObjectManager $manager)
    {
        $user = new User();
        $user
            ->setUsername('admin')
            ->setUsernameCanonical('admin')
            ->setPlainPassword('ilovenasa')
            ->setEmail('admin@example.com')
            ->setEmailCanonical('admin@example.com')
            ->setEnabled(true)
            ->addRole('ROLE_SUPER_ADMIN');
        $pass = $this->encoder->encodePassword($user, $user->getPlainPassword());
        $user->setPassword($pass);
        $manager->persist($user);
        $manager->flush();
        $this->addReference(self::ADMIN_USER_REFERENCE, $user);
    }

    private function createRealtorUser(ObjectManager $manager)
    {
        $user = new User();
        $user
            ->setUsername('realtor')
            ->setUsernameCanonical('realtor')
            ->setPlainPassword('ilovenasa')
            ->setEmail('realtor@example.com')
            ->setEmailCanonical('realtor@example.com')
            ->setEnabled(true)
            ->addRole('ROLE_REALTOR');
        $pass = $this->encoder->encodePassword($user, $user->getPlainPassword());
        $user->setPassword($pass);
        $manager->persist($user);
        $manager->flush();
        $this->addReference(self::REALTOR_USER_REFERENCE, $user);
    }

    private function createSimpleUser(ObjectManager $manager)
    {
        $user = new User();
        $user
            ->setUsername('user')
            ->setUsernameCanonical('user')
            ->setPlainPassword('ilovenasa')
            ->setEmail('user@example.com')
            ->setEmailCanonical('user@example.com')
            ->setEnabled(true)
            ->addRole('ROLE_USER');
        $pass = $this->encoder->encodePassword($user, $user->getPlainPassword());
        $user->setPassword($pass);
        $manager->persist($user);
        $manager->flush();
        $this->addReference(self::SIMPLE_USER_REFERENCE, $user);
    }

    public function load(ObjectManager $manager)
    {
        $this->createAdminUser($manager);
        $this->createRealtorUser($manager);
        $this->createSimpleUser($manager);
    }
}
