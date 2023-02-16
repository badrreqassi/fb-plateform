import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {

  constructor(public router: Router) {
  }

  items: MenuItem[] = [] as MenuItem[];

  username!: string;

  ngOnInit(): void {
    // @ts-ignore
    this.username = localStorage.getItem("username");
    this.items = [
      {
        label: 'Settings',
        icon: 'pi pi-sliders-v',
        items: [
          {
            label: 'Users list',
            icon: 'pi pi-list',
            visible: this.hasAdmin(),
            routerLink: '/admin/users/list'
          },
          {
            label: 'My account',
            icon: 'pi pi-user',
            routerLink: '/my-account'
          },
          {
            label: 'Change password',
            icon: 'pi pi-lock',
            routerLink: '/change-password'
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => {
              this.logOut();
            }
          }
        ]
      }] as MenuItem[];
  }

  hasAdmin(): boolean {
    const roles = localStorage.getItem('roles');
    // @ts-ignore
    return roles.includes('ADMIN');
  }

  logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('roles');
    this.router.navigate(['/Auth/login'])
  }
}
