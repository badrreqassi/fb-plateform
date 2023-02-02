import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import {Router} from "@angular/router";
import {FacebookService} from "../../../modules/core/services/facebook.service";

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {

  constructor( public  router :Router, private facebookService: FacebookService) { }
  items: MenuItem[] = [] as MenuItem[];
  ngOnInit(): void {
    this.items = [{
      label: 'Account',
      items: [
        {label: 'Se déconnecter',
          icon: 'pi pi-sign-out',
          command :() => {
          this.logOut();
          }
        }
      ]
    }] as MenuItem[];
  }

  logOut():void{
    this.facebookService.logoutFacebook();
    this.router.navigate(['/Auth/login'])
  }
}
