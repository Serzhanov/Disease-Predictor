<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


class ListDiseasesController extends AbstractController
{   
    private $json_data;
    private $defaulInput;
    private $allSymptoms;
    private int $numSymptoms;
    public function __construct(){
        $this->json_data=file_get_contents("C:/Users/Нурбек/Documents/GitHub/DiseasePredictionSymfony/src/artifacts/columns.json");
        //dd( $this->json_data);
        $this->allSymptoms=json_decode($this->json_data)->data_colums;//we know our key data_columns,i'll figure out the next
        $this->numSymptoms=count($this->allSymptoms);
        $this->defaulInput=array_fill(0,$this->numSymptoms,0);
    }

    #[Route('/list/diseases', name: 'app_list_diseases')]
    public function index(): Response
    {
        return $this->render('list_diseases/index.html.twig', [
            'controller_name' => 'ListDiseasesController',
            'allSymptoms'=>$this->allSymptoms
        ]);
    }
}
