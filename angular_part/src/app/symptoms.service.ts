import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
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

    return this.http.get(this.symptom);

  }
}
