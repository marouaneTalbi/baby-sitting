<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use App\DataPersister\UserDataPersister;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\ApiSubresource;
use App\Controller\UserWithProfileController;
use App\Controller\UserAvailabilities;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
#[ApiFilter(SearchFilter::class, properties: ['role' => 'exact', 'email' => 'exact'])] 
#[ApiResource(
    operations: [
        new Get(),
        new Post(
            processor: UserDataPersister::class,
            denormalizationContext: ['groups' => ['user:write']]
        ),
        new GetCollection(),
        new Put(),
        new Delete(),
    ],
    denormalizationContext: ['groups' => ['user:write']],
    normalizationContext: ['groups' => ['user:read']],

)]


class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['user:read', 'notifications:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['user:read', 'user:write', 'notifications:read'])]
    private ?string $email = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['user:read', 'user:write', 'notifications:read'])]
    private ?string $firstname = null;

    #[ORM\Column(length: 255)]
    #[Groups(['user:read', 'user:write', 'notifications:read'])]
    private ?string $lastname = null;

    #[ORM\Column(length: 255)]
    #[Groups(['user:read', 'user:write', 'notifications:read'])]
    private ?string $role = null;

    #[ORM\Column(length: 255)]
    #[Groups(['user:write', 'user:read'])]
    private ?string $password = null;

    #[ORM\Column]
    #[Groups(['user:read', 'user:write', 'notifications:read'])]
    private ?\DateTimeImmutable $created_at = null;

    #[ORM\OneToOne(mappedBy: 'user', cascade: ['persist', 'remove'])]
    #[Groups(['user:read', 'notifications:read'])]
    private ?Profile $profile = null;

    /**
     * @var Collection<int, UserService>
     */
    #[ORM\OneToMany(mappedBy: 'user_id',cascade: ['persist', 'remove'],targetEntity: UserService::class)]
    #[Groups(['user:read'])]
    private Collection $userServices;

    /**
     * @var Collection<int, Booking>
     */
    #[ORM\OneToMany(mappedBy: 'parent_id', cascade: ['remove'], orphanRemoval: true, targetEntity: Booking::class)]
    private Collection $bookings;

    /**
     * @var Collection<int, Review>
     */
    #[ORM\OneToMany(mappedBy: 'parent_id', targetEntity: Review::class)]
    private Collection $reviews;

    /**
     * @var Collection<int, Availability>
     */
    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Availability::class, fetch: 'EAGER')]
    #[Groups(['user:read'])]
    #[ApiSubresource()]
    private Collection $availabilities;

    #[ORM\OneToMany(mappedBy: 'parent', targetEntity: Notification::class)]
    private Collection $notifications;

    

    public function __construct()
    {
        $this->userServices = new ArrayCollection();
        $this->bookings = new ArrayCollection();
        $this->reviews = new ArrayCollection();
        $this->availabilities = new ArrayCollection();
        $this->created_at = new \DateTimeImmutable();
        $this->notifications = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(?string $firstname): static
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): static
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getRoles(): array
    {
        return $this->role ? [$this->role] : [];
    }

    public function setRole(string $role): static
    {
        if ($role === 'ROLE_ADMIN') {
            throw new \InvalidArgumentException('Invalid role');
        }
        $this->role = $role;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

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

    public function getProfile(): ?Profile
    {
        return $this->profile;
    }

    public function setProfile(?Profile $profile): static
    {
        // unset the owning side of the relation if necessary
        if ($profile === null && $this->profile !== null) {
            $this->profile->setUserId(null);
        }

        // set the owning side of the relation if necessary
        if ($profile !== null && $profile->getUserId() !== $this) {
            $profile->setUserId($this);
        }

        $this->profile = $profile;

        return $this;
    }

    /**
     * @return Collection<int, UserService>
     */
    public function getUserServices(): Collection
    {
        return $this->userServices;
    }

    public function addUserService(UserService $userService): static
    {
        if (!$this->userServices->contains($userService)) {
            $this->userServices->add($userService);
            $userService->setUserId($this);
        }

        return $this;
    }

    public function removeUserService(UserService $userService): static
    {
        if ($this->userServices->removeElement($userService)) {
            // set the owning side to null (unless already changed)
            if ($userService->getUserId() === $this) {
                $userService->setUserId(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Booking>
     */
    public function getBookings(): Collection
    {
        return $this->bookings;
    }

    public function addBooking(Booking $booking): static
    {
        if (!$this->bookings->contains($booking)) {
            $this->bookings->add($booking);
            $booking->setParentId($this);
        }

        return $this;
    }

    public function removeBooking(Booking $booking): static
    {
        if ($this->bookings->removeElement($booking)) {
            // set the owning side to null (unless already changed)
            if ($booking->getParentId() === $this) {
                $booking->setParentId(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Review>
     */
    public function getReviews(): Collection
    {
        return $this->reviews;
    }

    public function addReview(Review $review): static
    {
        if (!$this->reviews->contains($review)) {
            $this->reviews->add($review);
            $review->setParentId($this);
        }

        return $this;
    }

    public function removeReview(Review $review): static
    {
        if ($this->reviews->removeElement($review)) {
            // set the owning side to null (unless already changed)
            if ($review->getParentId() === $this) {
                $review->setParentId(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Availability>
     */
    public function getAvailabilities(): Collection
    {
        return $this->availabilities;
    }

    public function addAvailability(Availability $availability): static
    {
        if (!$this->availabilities->contains($availability)) {
            $this->availabilities->add($availability);
            $availability->setUserId($this);
        }

        return $this;
    }

    public function removeAvailability(Availability $availability): static
    {
        if ($this->availabilities->removeElement($availability)) {
            // set the owning side to null (unless already changed)
            if ($availability->getUserId() === $this) {
                $availability->setUserId(null);
            }
        }

        return $this;
    }

    /**
     * Retourne l'identifiant unique de l'utilisateur (généralement l'email).
     */
    public function getUserIdentifier(): string
    {
        return $this->email;
    }

    /**
     * Efface les informations sensibles temporaires (comme le mot de passe en clair).
     */
    public function eraseCredentials()
    {
        // Ne rien faire ici, sauf si tu as des données sensibles temporaires à effacer
    }

    public function getServices(): array
    {
        return array_map(fn($userService) => $userService->getService(), $this->userServices->toArray());
    }

    /**
     * @return Collection<int, Notification>
     */
    public function getNotifications(): Collection
    {
        return $this->notifications;
    }

    public function addNotification(Notification $notification): static
    {
        if (!$this->notifications->contains($notification)) {
            $this->notifications->add($notification);
            $notification->setParent($this);
        }

        return $this;
    }

    public function removeNotification(Notification $notification): static
    {
        if ($this->notifications->removeElement($notification)) {
            // set the owning side to null (unless already changed)
            if ($notification->getParent() === $this) {
                $notification->setParent(null);
            }
        }

        return $this;
    }
}
