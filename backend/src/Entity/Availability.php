<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\AvailabilityRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: AvailabilityRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['availability:read']],
    denormalizationContext: ['groups' => ['availability:write']]
)]
class Availability
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['user:read', 'availability:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'availabilities')]
    #[Groups(['user:read', 'availability:read'])]
    private ?User $user = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['user:read', 'availability:read'])]
    private ?string $day_of_week = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['user:read', 'availability:read'])]
    private ?\DateTimeInterface $start_time = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['availability:read'])]
    private ?\DateTimeInterface $end_time = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getDayOfWeek(): ?string
    {
        return $this->day_of_week;
    }

    public function setDayOfWeek(?string $day_of_week): static
    {
        $this->day_of_week = $day_of_week;

        return $this;
    }

    public function getStartTime(): ?\DateTimeInterface
    {
        return $this->start_time;
    }

    public function setStartTime(\DateTimeInterface $start_time): static
    {
        $this->start_time = $start_time;

        return $this;
    }

    public function getEndTime(): ?\DateTimeInterface
    {
        return $this->end_time;
    }

    public function setEndTime(\DateTimeInterface $end_time): static
    {
        $this->end_time = $end_time;

        return $this;
    }
}
