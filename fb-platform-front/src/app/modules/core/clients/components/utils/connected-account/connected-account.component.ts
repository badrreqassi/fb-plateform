import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FacebookService} from "../../../../services/facebook.service";

@Component({
  selector: 'app-connected-account',
  templateUrl: './connected-account.component.html',
  styleUrls: ['./connected-account.component.scss']
})
export class ConnectedAccountComponent implements OnInit {
  @Input() status!:string ;
  @Input() userName = '';
  @Output() onClickLogOut : EventEmitter<any> = new EventEmitter();

  constructor(
    private facebookService: FacebookService
  ) { }

  ngOnInit(): void {
    console.log(this.userName)
  }

  onLogOut() {
    this.onClickLogOut.emit(true);
  }

  logOut() {
    this.facebookService.logoutFacebook().subscribe(() => {
      this.onClickLogOut.emit(false);
    });
  }
}
