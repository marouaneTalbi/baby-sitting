<?php
// src/DataFixtures/BookingFixtures.php

namespace App\DataFixtures;

use App\Entity\Booking;
use App\Entity\User;
use App\Entity\Service;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class BookingFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        // Récupérer tous les utilisateurs existants dans la base de données
        $users = $manager->getRepository(User::class)->findAll();
        $services = $manager->getRepository(Service::class)->findAll();

        // Associer des bookings entre parents et service providers
        foreach ($users as $parent) {
            // Vérifier que l'utilisateur a le rôle "parent"
            if (in_array('ROLE_PARENT', $parent->getRoles(), true)) {
                // Ajouter 1 à 3 bookings aléatoirement pour chaque parent
                $bookingCount = rand(1, 3);

                for ($i = 0; $i < $bookingCount; $i++) {
                    // Trouver un service provider aléatoire
                    $serviceProvider = $users[array_rand($users)];

                    // Vérifier que le service provider n'est pas un parent et n'est pas le même utilisateur
                    while (in_array('ROLE_PARENT', $serviceProvider->getRoles(), true) || $serviceProvider === $parent) {
                        $serviceProvider = $users[array_rand($users)];
                    }

                    // Trouver un service aléatoire pour la réservation
                    $service = $services[array_rand($services)];

                    // Créer une booking
                    $booking = new Booking();
                    $booking->setParentId($parent);
                    $booking->setServiceProviderId($serviceProvider);
                    $booking->setServiceId($service);
                    $booking->setDate(new \DateTimeImmutable('now + ' . rand(1, 30) . ' days')); // Date de réservation aléatoire dans les 30 jours
                    $booking->setStartTime(new \DateTimeImmutable('now + ' . rand(8, 10) . ' hours')); // Heure de début aléatoire
                    $booking->setEndTime(new \DateTimeImmutable('now + ' . rand(11, 12) . ' hours')); // Heure de fin aléatoire
                    $booking->setStatus('pending'); // Statut par défaut

                    $manager->persist($booking);
                }
            }
        }

        // Enregistrer toutes les bookings dans la base de données
        $manager->flush();
    }

    // Spécifie que les UserFixtures et ServiceFixtures doivent être chargées avant BookingFixtures
    public function getDependencies()
    {
        return [
            UserFixtures::class,
            ServiceFixtures::class,
        ];
    }
}
