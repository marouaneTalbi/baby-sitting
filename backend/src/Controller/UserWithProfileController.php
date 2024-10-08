<?php


namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class UserWithProfileController extends AbstractController
{
    public function __invoke(UserRepository $userRepository): JsonResponse
    {
        $users = $userRepository->findAllUsersWithProfiles();

        return $this->json($users, 200, [], ['groups' => ['user:read']]);
    }
}
