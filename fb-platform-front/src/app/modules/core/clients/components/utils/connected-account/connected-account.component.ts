import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-connected-account',
  templateUrl: './connected-account.component.html',
  styleUrls: ['./connected-account.component.scss']
})
export class ConnectedAccountComponent implements OnInit {
  @Input() status!:string ;
  @Input() userName!:any;

  constructor() { }

  ngOnInit(): void {
    console.log(this.userName)
  }

}
