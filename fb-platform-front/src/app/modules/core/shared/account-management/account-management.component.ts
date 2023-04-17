import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../admin/services/user.service";
import {User} from "../../../../models/User";
import {MenuItem, MessageService} from "primeng/api";
import {Role} from "../../../../models/Role";
import {SharingDataService} from "../../services/sharing-data.service";
import {FacebookService} from "../../services/facebook.service";

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss']
})
export class AccountManagementComponent implements OnInit, OnDestroy {

  user!: User;

  accountForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  connected = '';
  facebookUsername = '';
   usersId!: number;

  constructor(private userService: UserService,
              private messageService: MessageService,
              private sharingData: SharingDataService,
              private facebookService: FacebookService
  ) {
  }


  ngOnInit(): void {
    this.usersId = parseInt(localStorage.getItem('userId') as string);
    this.facebookUsername = localStorage.getItem('userNameFacebook') as string;
    this.connected = JSON.parse(localStorage.getItem('facebookAccessToken') as string)?.status;
    const userId = localStorage.getItem('userId');
    if (userId && !isNaN(+userId)) {
      this.userService.getUserById(+userId).subscribe(response => {
        this.user = response;
        this.accountForm.patchValue({
          username: response.username,
          lastName: response.lastName,
          firstName: response.firstName,
          email: response.email,
        })
      })
    }
    setTimeout(() => {
      this.sharingData.changeMenuItem([{
        id: '123456789',
        label: 'Home',
        routerLink: '/client/campaignsTesting'
      }, {label: 'Account'}] as MenuItem[])

    })


  }

  onSubmit() {
    this.accountForm.markAllAsTouched();
    if (this.accountForm.valid) {
      const accountValue = this.accountForm.value;
      let roles = [] as number[];
      (this.user.roles as Role[]).forEach((role) => roles.push(role.id));
      if (this.user.id) {
        this.userService.updateUser(this.user.id, {
          username: accountValue.username,
          email: accountValue.email,
          firstName: accountValue.firstName,
          lastName: accountValue.lastName,
          roles: roles,
          adminId: this.usersId
        }).subscribe(response => {
          localStorage.setItem('username', response.username);
          this.messageService.add({
            severity: 'success',
            summary: 'Your information updated successfully!',
          })
        }, () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Failed to update Your information!',
          })
        });
      }
    } else {
      console.log('form is not valid');
    }
  }

  onLogin() {
    this.facebookService.logWithFacebook().subscribe(() => {
      setTimeout(() => {
        this.facebookUsername = localStorage.getItem('userNameFacebook') as string;
        this.connected = JSON.parse(localStorage.getItem('facebookAccessToken') as string)?.status;
        this.messageService.add({
          severity: 'success',
          summary: 'Linked successfully',
          detail: 'Your facebook linked with your account'
        });
      }, 500);
    })
  }

  onLogout() {
    this.connected = '';
    localStorage.removeItem('userNameFacebook');
    localStorage.removeItem('facebookAccessToken');
    this.messageService.add({
      severity: 'error',
      summary: 'Unlinked Facebook',
      detail: 'Your facebook unlinked from your account'
    });
  }

  ngOnDestroy(): void {
    setTimeout(() => {
      this.sharingData.changeMenuItem([] as MenuItem[])
    })
  }
}
