<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\BookingRepository;
use Doctrine\DBAL\Types\Types;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: BookingRepository::class)]
#[ApiResource]
#[ApiFilter(SearchFilter::class, properties: ['service_provider_id' => 'exact'])]
class Booking
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['booking:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'bookings')]
    #[Groups(['booking:read', 'booking:write'])]
    #[ORM\JoinColumn(name: "parent_id_id", referencedColumnName: "id", onDelete: "CASCADE")]
    private ?User $parent_id = null;

    #[ORM\ManyToOne(inversedBy: 'bookings')]
    #[Groups(['booking:read', 'booking:write', 'user:read'])]
    private ?User $service_provider_id = null;

    #[ORM\ManyToOne(inversedBy: 'bookings')]
    #[Groups(['booking:read', 'booking:write'])]
    private ?Service $service_id = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    #[Groups(['booking:read', 'booking:write'])]
    private ?\DateTimeInterface $date = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['booking:read', 'booking:write'])]
    private ?\DateTimeInterface $start_time = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['booking:read', 'booking:write'])]
    private ?\DateTimeInterface $end_time = null;

    #[ORM\Column(length: 255)]
    #[Groups(['booking:read', 'booking:write'])]
    private ?string $status = null;

    #[ORM\Column]
    #[Groups(['booking:read', 'booking:write'])]
    private ?\DateTimeImmutable $create_at = null;

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

    public function getServiceProviderId(): ?User
    {
        return $this->service_provider_id;
    }

    public function setServiceProviderId(?User $service_provider_id): static
    {
        $this->service_provider_id = $service_provider_id;

        return $this;
    }

    public function getServiceId(): ?Service
    {
        return $this->service_id;
    }

    public function setServiceId(?Service $service_id): static
    {
        $this->service_id = $service_id;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(?\DateTimeInterface $date): static
    {
        $this->date = $date;

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

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getCreateAt(): ?\DateTimeImmutable
    {
        return $this->create_at;
    }

    public function setCreateAt(\DateTimeImmutable $create_at): static
    {
        $this->create_at = $create_at;

        return $this;
    }
}
