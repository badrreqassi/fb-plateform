import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-connected-account',
  templateUrl: './connected-account.component.html',
  styleUrls: ['./connected-account.component.scss']
})
export class ConnectedAccountComponent implements OnInit {
  @Input() status!:string ;
  @Input() userName = '';
  @Output() onClickLogOut : EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    console.log(this.userName)
  }

  onLogOut() {
    this.onClickLogOut.emit(true);
  }
}
