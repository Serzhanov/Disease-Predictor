import { SymptomsService } from './symptoms.service';
import { Component } from '@angular/core';
import {Symptoms} from './interface_symptoms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public title = 'angular_part';
  public all_symptoms : Symptoms={symptoms:[]};
  public choosen_symptoms:Symptoms={symptoms:[]};

  constructor(private symps:SymptomsService){

  }
  assignment(object:Object){
    this.all_symptoms = object as Symptoms;
  }
  ngOnInit(){
    this.symps.readAllSymps().subscribe({
    next: (obj) => this.assignment(obj),
    error: (e) => console.error(e),
    complete: () => console.info('complete')
    }
    )
  }
  choseSymptom(symptom:string){
    let checkDup=false;
    for (let i=0;i<this.choosen_symptoms.symptoms.length;i++){
      if(this.choosen_symptoms.symptoms[i]===symptom)
        checkDup=true;
    }
    if(!checkDup)
      this.choosen_symptoms.symptoms.push(symptom);

  }
}
