<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Constraints\Length;

class ListDiseasesController extends AbstractController
{   
    private $pathArt = "C:/Users/Нурбек/Documents/GitHub/DiseasePredictionSymfony/src/artifacts";
    private $json_data;
    private $allSymptoms;
    private int $numSymptoms;
    private $output="";

    public function __construct(){

        $this->json_data=file_get_contents($this->pathArt."/columns.json");
        $this->allSymptoms=json_decode($this->json_data)->data_colums;//we know our key data_columns,i'll figure out the next
        $this->numSymptoms=count($this->allSymptoms);
        $this->defaultInput=array_fill(0,$this->numSymptoms,0);
    }

    #[Route('/list/diseases', name: 'app_list_diseases')]
    public function index(): Response
    {
        return $this->render('list_diseases/index.html.twig', [
            'controller_name' => 'ListDiseasesController',
            'allSymptoms'=>$this->allSymptoms,
            'output'=>$this->output,
            'getDiseasePred'=>$this->getDiseasePred()
        ]);
    }

    #[Route('/list/diseases/predicted', name: 'predicted')]
    public function getDiseasePred(){
        
        $temp=implode(",",$this->defaultInput);
        $this->output = shell_exec("python ".$this->pathArt."/util.py $temp");

        return $this->render('list_diseases/index.html.twig', [
            'controller_name' => 'ListDiseasesController',
            'allSymptoms'=>$this->allSymptoms,
            'output'=>$this->output
        ]);
    }

    public function chooseTheSymp(int $index){
        $this->allSymptoms[$index]=1;
        dd("here");
    }
   
}


