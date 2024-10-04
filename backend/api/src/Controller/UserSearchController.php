<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class UserSearchController
{
    private UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    #[Route('/users/search/{name}', name: 'user_search')]
    public function __invoke(string $name): JsonResponse
    {
        $users = $this->userRepository->findBy(['firstname' => $name]);

        return new JsonResponse($users);
    }
}
