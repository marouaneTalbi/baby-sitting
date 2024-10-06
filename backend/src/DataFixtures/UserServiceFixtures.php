<?php

namespace App\DataFixtures;

use App\Entity\User;
use App\Entity\Service;
use App\Entity\UserService;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class UserServiceFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        // Récupérer tous les utilisateurs et services existants
        $users = $manager->getRepository(User::class)->findAll();
        $services = $manager->getRepository(Service::class)->findAll();

        // Associer chaque utilisateur à un service aléatoire
        foreach ($users as $user) {
            $randomService = $services[array_rand($services)];

            $userService = new UserService();
            $userService->setUserId($user);
            $userService->setService($randomService);

            $manager->persist($userService);
        }

        // Sauvegarder les données dans la table `UserService`
        $manager->flush();
    }
}