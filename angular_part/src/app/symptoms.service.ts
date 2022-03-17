import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class SymptomsService {
  public symptom : string = "http://127.0.0.1:5000/get_all_symptoms";
  public resultatSymptoms:string ="http://127.0.0.1:5000/passing_the_symptoms";
  public resultatSymptoms2:string ="http://127.0.0.1:5000/zaebal";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type':  'application/json'
    })
  };
  constructor(private http : HttpClient) {

   }
   ngOnInit(){

    }
  readAllSymps(){
    return this.http.get(this.symptom);
  }
  passChosenSymtom(arrSymps:any){
    console.log(arrSymps)
    return this.http.post(this.resultatSymptoms,{symptoms:arrSymps},this.httpOptions)
  }

}
