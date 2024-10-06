<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ReviewRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ReviewRepository::class)]
#[ApiResource]
class Review
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'reviews')]
    private ?User $parent_id = null;

    #[ORM\ManyToOne(inversedBy: 'reviews')]
    private ?User $services_provider_id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $rating = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $comment = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $created_at = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getParentId(): ?User
    {
        return $this->parent_id;
    }

    public function setParentId(?User $parent_id): static
    {
        $this->parent_id = $parent_id;

        return $this;
    }

    public function getServicesProviderId(): ?User
    {
        return $this->services_provider_id;
    }

    public function setServicesProviderId(?User $services_provider_id): static
    {
        $this->services_provider_id = $services_provider_id;

        return $this;
    }

    public function getRating(): ?string
    {
        return $this->rating;
    }

    public function setRating(?string $rating): static
    {
        $this->rating = $rating;

        return $this;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(?string $comment): static
    {
        $this->comment = $comment;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeImmutable $created_at): static
    {
        $this->created_at = $created_at;

        return $this;
    }
}
