import { Component, OnInit ,Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ng-chips',
  templateUrl: './ng-chips.component.html',
  styleUrls: ['./ng-chips.component.scss']
})

export class NgChipsComponent implements OnInit {
  @Input() choosenSymps :string[]=[];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

}
