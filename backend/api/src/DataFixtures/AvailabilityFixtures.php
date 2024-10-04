<?php

// src/DataFixtures/AvailabilityFixtures.php

namespace App\DataFixtures;

use App\Entity\Availability;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class AvailabilityFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        // Récupérer tous les utilisateurs existants dans la base de données
        $users = $manager->getRepository(User::class)->findAll();

        // Associer des disponibilités aux service providers
        foreach ($users as $serviceProvider) {
            // Vérifier que l'utilisateur n'est pas un parent
            if (!in_array('ROLE_PARENT', $serviceProvider->getRoles(), true)) {
                // Ajouter 3 à 7 disponibilités aléatoires pour chaque service provider
                $availabilityCount = rand(3, 7);

                for ($i = 0; $i < $availabilityCount; $i++) {
                    // Créer une disponibilité aléatoire
                    $availability = new Availability();
                    $availability->setUserId($serviceProvider);
                    
                    // Jour de la semaine aléatoire
                    $daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                    $availability->setDayOfWeek($daysOfWeek[array_rand($daysOfWeek)]);

                    // Heure de début et de fin aléatoires
                    $startHour = rand(8, 14); // Heure de début entre 8h et 14h
                    $endHour = $startHour + rand(1, 4); // Heure de fin entre 1 et 4 heures après le début
                    $availability->setStartTime(new \DateTimeImmutable("$startHour:00"));
                    $availability->setEndTime(new \DateTimeImmutable("$endHour:00"));

                    $manager->persist($availability);
                }
            }
        }

        // Enregistrer toutes les disponibilités dans la base de données
        $manager->flush();
    }

    // Spécifie que les UserFixtures doivent être chargées avant AvailabilityFixtures
    public function getDependencies()
    {
        return [
            UserFixtures::class,
        ];
    }
}
