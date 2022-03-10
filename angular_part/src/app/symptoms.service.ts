import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Symptom} from './interface_symptoms';
@Injectable({
  providedIn: 'root'
})

export class SymptomsService {

  public symptom : string = "http://127.0.0.1:5000/get_all_symptoms";
  constructor(private http : HttpClient) {


   }
   ngOnInit(){

  }
  readAllSymps(){
    let x = this.http.get<string[]>(this.symptom[0]);
    console.log(x)
    console.log(x)
    return this.http.get<string[]>(JSON.parse(this.symptom[0]));
  }
}
