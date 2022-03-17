import { SymptomsService } from './symptoms.service';
import { Component } from '@angular/core';
import { Symptoms, Result } from './interface_symptoms';
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
  public resultOfPrediction:Result={predicted_disease:""};
  public result:string|undefined;

  constructor(private symps:SymptomsService){

  }
  assignmentForSymptoms(object:Object){
    this.all_symptoms = object as Symptoms;
  }
  assignmentForResult(object:Object){
    this.resultOfPrediction=object as Result
    this.result=this.resultOfPrediction.predicted_disease


  }
  ngOnInit(){
    this.symps.readAllSymps().subscribe({
        next: (obj) => this.assignmentForSymptoms(obj),
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
      next: (obj) => this.assignmentForResult(obj),
      error: (e) => console.error(e),
      complete: () => console.info('complete')
      }
    )
  }
}
