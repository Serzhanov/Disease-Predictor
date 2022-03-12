import { SymptomsService } from './symptoms.service';
import { Component } from '@angular/core';
import {Symptoms} from './interface_symptoms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'angular_part';
  all_symptoms : Symptoms={symptoms:[]};
  nameSymptoms:string[]=[];
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
}
