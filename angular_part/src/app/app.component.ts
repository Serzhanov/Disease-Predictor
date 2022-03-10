import { SymptomsService } from './symptoms.service';
import { Component } from '@angular/core';
import {Symptom} from './interface_symptoms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'angular_part';
  all_symptoms : string[]=[];
  constructor(private symps:SymptomsService){

  }
  ngOnInit(){
    this.symps.readAllSymps().subscribe(
      (response)=>
      {
        this.all_symptoms=response;
      },
      (error)=>
      {
        console.log(error);
        console.log("error");
      }
    )
  }
}
