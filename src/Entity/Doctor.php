<?php

namespace App\Entity;

use App\Repository\DoctorRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

#[ORM\Entity(repositoryClass: DoctorRepository::class)]
/*
* @Table(name="doctor", indexes={@Index(name="type_idx", columns={"id","clients"})})
*/
class Doctor extends UserOriginal
{

    #[ORM\Column(type: 'string', length: 255)]
    private $functionality;

    #[ORM\ManyToMany(targetEntity:'Doctor',mappedBy:"doctors")]
    private $clients;

    #[ORM\Column(type: 'string', length: 255)]
    private $department;

   
    public function __construct()
    {
        $this->clients = new ArrayCollection();
    }

    public function getFunctionality(): ?string
    {
        return $this->functionality;
    }

    public function setFunctionality(string $functionality): self
    {
        $this->functionality = $functionality;

        return $this;
    }

    public function getClients(): ?ArrayCollection
    {
        return $this->clients;
    }

    public function setClients(?int $clients): self
    {
        $this->clients = $clients;

        return $this;
    }

    public function getDepartment(): ?string
    {
        return $this->department;
    }

    public function setDepartment(string $department): self
    {
        $this->department = $department;

        return $this;
    }
}
