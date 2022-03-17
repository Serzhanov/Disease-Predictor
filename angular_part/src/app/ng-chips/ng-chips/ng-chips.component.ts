import { Component, OnInit ,Input, Output,EventEmitter} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TagModel } from 'ngx-chips/core/tag-model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ng-chips',
  templateUrl: './ng-chips.component.html',
  styleUrls: ['./ng-chips.component.scss']
})

export class NgChipsComponent implements OnInit {
  @Input() choosenSymps :string[]=[];
  @Output() deleteSymp=new EventEmitter();
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  deleteSymptom_emit(element:any){
    this.deleteSymp.emit(element);
  }


}
