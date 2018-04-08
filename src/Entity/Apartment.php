<?php declare(strict_types=1);

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\AdvancedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ApartmentRepository")
 */
class Apartment
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $area;

    /**
     * @ORM\Column(type="integer")
     */
    private $price_per_month;

    /**
     * @ORM\Column(type="integer")
     */
    private $room_count;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $gps_latitude;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $gps_longitude;

    /**
     * @ORM\Column(type="datetime")
     */
    private $created_at;

    /**
     * Many Apartments have one user.
     * @ORM\ManyToOne(targetEntity="User", inversedBy="apartments")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     */
    private $user;

    /**
     * @ORM\Column(type="boolean")
     */
    private $available;

    /**
     * @return mixed
     */
    public function getAvailable()
    {
        return $this->available;
    }

    /**
     * @param $available
     * @return $this
     */
    public function setAvailable($available)
    {
        $this->available = $available;

        return $this;
    }

    /**
     * @return AdvancedUserInterface
     */
    public function getUser(): AdvancedUserInterface
    {
        return $this->user;
    }

    /**
     * @param null|UserInterface $user
     * @return Apartment
     */
    public function setUser(?UserInterface $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function __construct()
    {
        $this->created_at = new \DateTime('now');
    }

    public function getId()
    {
        return $this->id;
    }

    public function getArea(): ?int
    {
        return $this->area;
    }

    public function setArea(int $area): self
    {
        $this->area = $area;

        return $this;
    }

    public function getPricePerMonth(): ?int
    {
        return $this->price_per_month;
    }

    public function setPricePerMonth(int $price_per_month): self
    {
        $this->price_per_month = $price_per_month;

        return $this;
    }

    public function getRoomCount(): ?int
    {
        return $this->room_count;
    }

    public function setRoomCount(int $room_count): self
    {
        $this->room_count = $room_count;

        return $this;
    }

    public function getGpsLatitude(): ?string
    {
        return $this->gps_latitude;
    }

    public function setGpsLatitude(string $gps_latitude): self
    {
        $this->gps_latitude = $gps_latitude;

        return $this;
    }

    public function getGpsLongitude(): ?string
    {
        return $this->gps_longitude;
    }

    public function setGpsLongitude(string $gps_longitude): self
    {
        $this->gps_longitude = $gps_longitude;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeInterface $created_at): self
    {
        $this->created_at = $created_at;

        return $this;
    }
}
