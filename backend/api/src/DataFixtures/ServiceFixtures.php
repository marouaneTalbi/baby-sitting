<?php

namespace App\DataFixtures;

use App\Entity\Service;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class ServiceFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        // Créer des services fictifs
        $servicesData = [
            ['name' => 'Babysitting', 'description' => 'Service de garde d\'enfants.'],
            ['name' => 'Cleaning', 'description' => 'Service de ménage à domicile.'],
            ['name' => 'Tutoring', 'description' => 'Service de tutorat pour les enfants.'],
        ];

        foreach ($servicesData as $data) {
            $service = new Service();
            $service->setName($data['name']);
            $service->setDescription($data['description']);
            
            $manager->persist($service);
        }

        // Enregistrer tous les services dans la base de données
        $manager->flush();
    }
}
