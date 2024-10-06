<?php

// src/DataFixtures/ProfileFixtures.php

namespace App\DataFixtures;

use App\Entity\Profile;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class ProfileFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        // Récupérer tous les utilisateurs existants dans la base de données
        $users = $manager->getRepository(User::class)->findAll();

        foreach ($users as $user) {
            // Vérifier si un profil existe déjà pour cet utilisateur
            if (!$manager->getRepository(Profile::class)->findOneBy(['user_id' => $user])) {
                // Créer un nouveau profil pour l'utilisateur
                $profile = new Profile();
                $profile->setUserId($user);
                $profile->setPhone('123-456-7890'); // Numéro de téléphone fictif
                $profile->setAddress('123 Main Street'); // Adresse fictive
                $profile->setDescription('This is a profile description for ' . $user->getFirstname());
                $profile->setAvailability('Available Monday to Friday'); // Disponibilité fictive
                $profile->setRatePerHour(rand(10, 50)); // Tarif horaire fictif

                $profile->setCreatedAt(new \DateTimeImmutable());

                $manager->persist($profile);
            }
        }

        // Enregistrer tous les profils dans la base de données
        $manager->flush();
    }

    // Spécifie que les UserFixtures doivent être chargées avant ProfileFixtures
    public function getDependencies()
    {
        return [
            UserFixtures::class,
        ];
    }
}
