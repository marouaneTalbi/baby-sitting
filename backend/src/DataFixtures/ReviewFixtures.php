<?php

// src/DataFixtures/ReviewFixtures.php

namespace App\DataFixtures;

use App\Entity\Review;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class ReviewFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        // Récupérer tous les utilisateurs existants dans la base de données
        $users = $manager->getRepository(User::class)->findAll();

        // Associer des reviews de parent à des service providers (nannies/cleaners)
        foreach ($users as $parent) {
            // Vérifier que l'utilisateur a le rôle "parent"
            if (in_array('ROLE_PARENT', $parent->getRoles(), true)) {
                // Ajouter 1 à 3 reviews aléatoirement pour chaque parent
                $reviewCount = rand(1, 3);

                for ($i = 0; $i < $reviewCount; $i++) {
                    // Trouver un service provider aléatoire
                    $serviceProvider = $users[array_rand($users)];

                    // Vérifier que le service provider n'est pas un parent et n'est pas le même utilisateur
                    while (in_array('ROLE_PARENT', $serviceProvider->getRoles(), true) || $serviceProvider === $parent) {
                        $serviceProvider = $users[array_rand($users)];
                    }

                    // Créer une review
                    $review = new Review();
                    $review->setParentId($parent);
                    $review->setServiceProviderId($serviceProvider);
                    $review->setRating(rand(1, 5)); // Note aléatoire entre 1 et 5
                    $review->setComment('This is a review from ' . $parent->getFirstname() . ' for ' . $serviceProvider->getFirstname());

                    $manager->persist($review);
                }
            }
        }

        // Enregistrer toutes les reviews dans la base de données
        $manager->flush();
    }

    // Spécifie que les UserFixtures doivent être chargées avant ReviewFixtures
    public function getDependencies()
    {
        return [
            UserFixtures::class,
        ];
    }
}
