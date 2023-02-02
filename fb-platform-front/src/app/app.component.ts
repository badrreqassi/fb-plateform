import {Component, OnInit} from '@angular/core';
import {FacebookService} from "./modules/core/services/facebook.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private facebookService: FacebookService) {
  }

  ngOnInit(): void {
    this.facebookService.initFacebook();
  }
}
