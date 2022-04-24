<?php

namespace App\Entity;

use App\Repository\DiseaseRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: DiseaseRepository::class)]
/*
* @Table(name="disease", indexes={@Index(name="type_idx", columns={"id","codes"})})
*/
class Disease
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\ManyToMany(targetEntity:'Client',mappedBy:"diseases")]
    private $codes;

    #[ORM\Column(type: 'string', length: 255)]
    private $name;

    #[ORM\Column(type: 'text', length: 1024, nullable: true)]
    private $precaution;

    public function __construct()
    {
        $this->codes= new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection<int, Client>
     */
    public function getCodes(): Collection
    {
        return $this->codes;
    }

    public function setCodes(ArrayCollection $codes): self
    {
        $this->codes = $codes;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getPrecaution(): ?string
    {
        return $this->precaution;
    }

    public function setPrecaution(?string $precaution): self
    {
        $this->precaution = $precaution;

        return $this;
    }

    public function addCode(Client $code): self
    {
        if (!$this->codes->contains($code)) {
            $this->codes[] = $code;
            $code->addDisease($this);
        }

        return $this;
    }

    public function removeCode(Client $code): self
    {
        if ($this->codes->removeElement($code)) {
            $code->removeDisease($this);
        }

        return $this;
    }
}
