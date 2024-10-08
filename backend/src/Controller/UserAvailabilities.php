<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;

class UserAvailabilities extends AbstractController
{
    public function __invoke(int $id, UserRepository $userRepository): JsonResponse
    {
         $availabilities = $userRepository->findUserAvailabilities($id);
        return $this->json($availabilities, 200, [], ['groups' => ['user:read']]);
    }
}
