<?php


// src/DataFixtures/UserFixtures.php

namespace App\DataFixtures;

use App\Entity\User;
use App\Entity\Service;
use App\Entity\UserService;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        // Récupérer tous les services existants dans la base de données
        $services = $manager->getRepository(Service::class)->findAll();

        // Créer des utilisateurs fictifs
        for ($i = 0; $i < 10; $i++) {
            $user = new User();
            $user->setEmail("user$i@example.com");
            $user->setFirstname("Firstname$i");
            $user->setLastname("Lastname$i");
            $user->setRole('parent');

            // Hacher le mot de passe
            $password = $this->passwordHasher->hashPassword($user, 'password123');
            $user->setPassword($password);

            // Définir la date de création
            $user->setCreatedAt(new \DateTimeImmutable());

            $manager->persist($user);

            // Associer des services aléatoires à chaque utilisateur
            foreach ($services as $service) {
                // Ajouter une association UserService pour chaque service
                if (rand(0, 1)) { // Associe aléatoirement un service (tu peux ajuster la logique)
                    $userService = new UserService();
                    $userService->setUserId($user);
                    $userService->setService($service);

                    $manager->persist($userService);
                }
            }
        }

        // Enregistrer tous les utilisateurs et leurs associations dans la base de données
        $manager->flush();
    }
}
