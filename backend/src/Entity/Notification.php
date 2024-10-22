<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\NotificationRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;


#[ORM\Entity(repositoryClass: NotificationRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['notifications:read']],
    denormalizationContext: ['groups' => ['notifications:write']],
)]
#[ApiFilter(SearchFilter::class, properties: [
    'parent' => 'exact',
    'service_provider' => 'exact'
])]
class Notification
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['notifications:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'notifications')]
    #[Groups(['notifications:read', 'notifications:write', 'notifications:relation'])]
    private ?User $serviceProvider = null;

    #[ORM\ManyToOne(inversedBy: 'notifications')]
    #[Groups(['notifications:read', 'notifications:write', 'notifications:relation'])]
    private ?User $parent = null;

    #[ORM\Column]
    #[Groups(['notifications:read', 'notifications:write'])]
    private ?bool $seen = null;

    #[ORM\Column]
    #[Groups(['notifications:read', 'notifications:write'])]
    private ?bool $seenByProvider = null;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getParent(): ?User
    {
        return $this->parent;
    }

    public function setParent(?User $parent): static
    {
        $this->parent = $parent;

        return $this;
    }

    public function getServiceProvider(): ?User
    {
        return $this->serviceProvider;
    }
    
    public function setServiceProvider(?User $serviceProvider): static
    {
        $this->serviceProvider = $serviceProvider;
    
        return $this;
    }

    public function isSeen(): ?bool
    {
        return $this->seen;
    }

    public function setSeen(bool $seen): static
    {
        $this->seen = $seen;

        return $this;
    }

    public function isSeenByProvider(): ?bool
    {
        return $this->seenByProvider;
    }

    public function setSeenByProvider(bool $seenByProvider): static
    {
        $this->seenByProvider = $seenByProvider;

        return $this;
    }
}
