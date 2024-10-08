<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\Security;

class GetCurrentUserController extends AbstractController
{
    private Security $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public function __invoke(): JsonResponse
    {
        $user = $this->security->getUser();

        if (null === $user) {
            return new JsonResponse(['error' => 'Cet utilisateur n\'est pas authentifié.'], 404);
        }

        $profile = $user->getProfile();

        return new JsonResponse([
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'firstname' => $user->getFirstname(),
            'lastname' => $user->getLastname(),
            'role' => $user->getRoles(),
            'profile' => [
                'id' => $profile ? $user->getProfile()->getId() :null,
                'phone' => $profile ? $user->getProfile()->getPhone() :null,
                'address' => $profile ? $user->getProfile()->getAddress() :null,
                'rate_per_hour' => $profile ? $user->getProfile()->getRatePerHour():null,
                'description' => $profile ? $user->getProfile()->getDescription() :null,
                'availability' => $profile ? $user->getProfile()->getAvailability() :null,
            ],
            'created_at' => $user->getCreatedAt(),
        ]);
    }
}
