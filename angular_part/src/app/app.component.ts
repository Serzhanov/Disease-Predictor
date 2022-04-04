import { SymptomsService } from './symptoms.service';
import { Component } from '@angular/core';
import { Symptoms, Description, Precaution, Disease } from './interface_symptoms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public title = 'angular_part';
  public all_symptoms : Symptoms={symptoms:[]};
  public choosen_symptoms:Symptoms={symptoms:[]};
  private allDisease=new Array(131).fill(0);
  public resultOfPrediction:Disease|undefined;
  public  description:Description|undefined;
  public  precaution:Precaution|undefined;

  constructor(private symps:SymptomsService){

  }

  ngOnInit(){
    this.symps.readAllSymps().subscribe({
        next: (obj) => this.all_symptoms = obj as Symptoms,
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      }
    )
  }
  choseSymptom(symptom:string,indexOfSymp:number){
    let checkDup=false;
    for (let i=0;i<this.choosen_symptoms.symptoms.length;i++){
      if(this.choosen_symptoms.symptoms[i]===symptom||this.choosen_symptoms.symptoms.length>17)
        checkDup=true;
    }
    if(!checkDup)
      this.choosen_symptoms.symptoms.push(symptom);
      this.allDisease[indexOfSymp]=1

  }
  deleteSymptom(deletingSymptom:string){
    this.choosen_symptoms.symptoms=this.choosen_symptoms.symptoms.filter(e =>e!=deletingSymptom)
  }
  getResult(){
    this.symps.passChosenSymtom(this.allDisease).subscribe({
      next: (obj) => this.resultOfPrediction=obj as Disease,
      error: (e) => console.error(e),
      complete: () => console.info('complete in symps')
      }
    )
    this.getDescription()
    this.getPrecaution()
  }
  getDescription(){
    this.symps.getDescriptionResponse().subscribe({
      next:(obj)=>this.description=obj as Description,
      error:(e)=>console.log("error appeared in getDescription ",e),
      complete:()=> console.log("complete in getDescription")
      }
    )
  }
  getPrecaution(){
    this.symps.getPrecautionResponse().subscribe({
      next:(obj)=>this.precaution=obj as Precaution,
      error:(e)=>console.log("error appeared in getPrecaution ",e),
      complete:()=> console.log("complete in getPrecaution")
      }
    )
  }
}
