<?php

namespace App\Entity;

use App\Repository\ClientRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

#[ORM\Entity(repositoryClass: ClientRepository::class)]
/*
* @Table(name="client", indexes={@Index(name="type_idx", columns={"id","doctors","diseases"})})
*/
class Client extends UserOriginal
{
  

    #[ORM\ManyToMany(targetEntity:'Disease',inversedBy:"code")]
    private $diseases;

    #[ORM\Column(type: 'text', length: 1024, nullable: true)]
    private $treatment;

    #[ORM\Column(type: 'datetime',nullable :true)]
    private $dateTreatment;


    #[ORM\ManyToMany(targetEntity:'Doctor',inversedBy:"clients")]
    private $doctors;

    #[ORM\Column(type: 'text', length: 255, nullable: true)]
    private $note;

    #[ORM\Column(type: 'boolean',nullable :true)]
    private $state;

    #[ORM\Column(type: 'datetime',nullable :true)]
    private $endDateTreatment;

  
    public function __construct()
    {
        $this->doctors = new ArrayCollection();
        $this->diseases= new ArrayCollection();
    }

    public function getState(): ?bool
    {
        return $this->state;
    }

    public function setState(?bool $state): self
    {
        $this->state = $state;

        return $this;
    }

    /**
     * @return Collection<int, Disease>
     */
    public function getDiseases(): Collection
    {
        return $this->diseases;
    }

    public function setDiseases(?ArrayCollection $diseases): self
    {
        $this->diseases = $diseases;

        return $this;
    }

    public function getTreatment(): ?string
    {
        return $this->treatment;
    }

    public function setTreatment(?string $treatment): self
    {
        $this->treatment = $treatment;

        return $this;
    }

    /**
     * @return Collection<int, Doctor>
     */
    public function getDoctors(): Collection
    {
        return $this->doctors;
    }

    public function setDoctors(?ArrayCollection $doctors): self
    {
        $this->doctors = $doctors;

        return $this;
    }

    public function getNote(): ?string
    {
        return $this->note;
    }

    public function setNote(?string $note): self
    {
        $this->note = $note;

        return $this;
    }

    public function getDateTreatment(): ?\DateTimeInterface
    {
        return $this->dateTreatment;
    }

    public function setDateTreatment(?\DateTimeInterface $dateTreatment): self
    {
        $this->dateTreatment = $dateTreatment;

        return $this;
    }

    public function getEndDateTreatment(): ?\DateTimeInterface
    {
        return $this->endDateTreatment;
    }

    public function setEndDateTreatment(?\DateTimeInterface $endDateTreatment): self
    {
        $this->endDateTreatment = $endDateTreatment;

        return $this;
    }

    public function addDisease(Disease $disease): self
    {
        if (!$this->diseases->contains($disease)) {
            $this->diseases[] = $disease;
        }

        return $this;
    }

    public function removeDisease(Disease $disease): self
    {
        $this->diseases->removeElement($disease);

        return $this;
    }

    public function addDoctor(Doctor $doctor): self
    {
        if (!$this->doctors->contains($doctor)) {
            $this->doctors[] = $doctor;
        }

        return $this;
    }

    public function removeDoctor(Doctor $doctor): self
    {
        $this->doctors->removeElement($doctor);

        return $this;
    }

}
