<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\UserServiceRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserServiceRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['user_service:read']]
)]
#[ApiFilter(SearchFilter::class, properties: ['user' => 'exact'])]
class UserService
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'userServices')]
    #[Groups(['user_service:read'])]
    private ?User $user_id = null;

    #[ORM\ManyToOne(inversedBy: 'userServices')]
    #[Groups(['user_service:read'])]
    #[Subresource] 
    private ?Service $service = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUserId(): ?User
    {
        return $this->user_id;
    }

    public function setUserId(?User $user_id): static
    {
        $this->user_id = $user_id;

        return $this;
    }

    public function getService(): ?Service
    {
        return $this->service;
    }

    public function setService(?Service $service): static
    {
        $this->service = $service;

        return $this;
    }
}
