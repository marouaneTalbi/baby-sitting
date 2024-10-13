<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\NotificationRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;

class UserNotificationsAndServiceProviders extends AbstractController
{

    public function __invoke(int $id, NotificationRepository $notificationRepository): JsonResponse
    {
        $notifications = $notificationRepository->findUserNotifications($id);

        $response = [];

        foreach ($notifications as $notification) {

            $parent = $notification->getParent();
            $profile = $parent->getProfile();
            $serviceProvider = $notification->getServiceProvider();

            $response[] = [
                'notification_id' => $notification->getId(),
                'seen' => $notification->isSeen(),
                'seen_by_provider' => $notification->isSeenByProvider(),
                'parent' => [
                    'id' => $notification->getParent()->getId(),
                    'firstname' => $notification->getParent()->getFirstname(),
                    'lastname' => $notification->getParent()->getLastname(),
                    'email' => $notification->getParent()->getEmail(),
                    'profile' => $profile ? [
                        'phone' => $profile->getPhone(),
                        'address' => $profile->getAddress(),
                        'rate_per_hour' => $profile->getRatePerHour(),
                        'description' => $profile->getDescription(),
                    ] : null,

                ],
                'service_provider' => [
                    'id' => $notification->getServiceProvider()->getId(),
                    'firstname' => $notification->getServiceProvider()->getFirstname(),
                    'lastname' => $notification->getServiceProvider()->getLastname(),
                    'email' => $notification->getServiceProvider()->getEmail(),
                    'profile' =>  [
                        'phone' => $serviceProvider->getProfile()->getPhone(),
                        'address' => $serviceProvider->getProfile()->getAddress(),
                        'rate_per_hour' => $serviceProvider->getProfile()->getRatePerHour(),
                        'description' => $serviceProvider->getProfile()->getDescription(),
                    ] ,
                ],
            ];
        }

        return new JsonResponse($response);
    }
}