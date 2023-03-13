import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../admin/services/user.service";
import {MenuItem, MessageService} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  passwordForm = new FormGroup({
    currentPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  });
  constructor(private userService: UserService,
              private messageService: MessageService,
              private  router :Router
              ) { }

  ngOnInit(): void {

  }

  onSubmit() {
    this.passwordForm.markAllAsTouched();
    if (this.passwordForm.valid){
      const passwordValues = this.passwordForm.value;
      if (passwordValues.newPassword !== passwordValues.confirmPassword){
        this.messageService.clear();
        this.messageService.add({
          severity: 'error',
          summary: 'Confirm password did not match!'
        })
      }else {
        const userId = localStorage.getItem('userId');
        if ( userId && !isNaN(+userId)){
          this.userService.changePassword(+userId, {
            oldPassword: passwordValues.currentPassword,
            newPassword: passwordValues.newPassword,
            confirmPassword: passwordValues.confirmPassword,
          }).subscribe(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Password updated successfully!'
            })
            this.router.navigate(['/my-account'])
          }, (er) => {
            console.log(er)
            this.messageService.add({
              severity: 'error',
              summary: 'Failed to update password!'
            })
          })

        }
      }
    }

  }
}
