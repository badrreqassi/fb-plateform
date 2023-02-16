import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../admin/services/user.service";
import {User} from "../../../../models/User";
import {MessageService} from "primeng/api";
import {Role} from "../../../../models/Role";

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss']
})
export class AccountManagementComponent implements OnInit {

  user!: User;

  accountForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private userService: UserService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if ( userId && !isNaN(+userId)){
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
  }

  onSubmit() {
    this.accountForm.markAllAsTouched();
    if (this.accountForm.valid) {
      const accountValue = this.accountForm.value;
      console.log(this.user);
      let roles = [] as number[];
      (this.user.roles as Role[]).forEach((role )  => roles.push(role.id));
      if (this.user.userId){
        this.userService.updateUser(this.user.userId, {
          username: accountValue.username,
          email: accountValue.email,
          firstName: accountValue.firstName,
          lastName: accountValue.lastName,
          roles: roles
        }).subscribe(response => {
          localStorage.setItem('username', response.username);
          this.messageService.add({
            severity: 'success',
            summary: 'Your information updated successfully!',
          })
        },() => {
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

  }
}
