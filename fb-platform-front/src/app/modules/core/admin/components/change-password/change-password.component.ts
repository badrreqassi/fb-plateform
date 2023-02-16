import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {MessageService} from "primeng/api";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  userId!: number;
  passwordForm = new FormGroup({
    newPassword: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  constructor(private userService: UserService,
              private dialogRef: DynamicDialogRef,
              private dialogConfig: DynamicDialogConfig,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    if (this.dialogConfig.data) {
      this.userId = this.dialogConfig.data.userId;
    }
  }


  onSubmit() {
    this.passwordForm.markAllAsTouched();
    if (this.passwordForm.valid) {
      const passwordValues = this.passwordForm.value;
      if (passwordValues.newPassword !== passwordValues.confirmPassword) {
        this.messageService.clear();
        this.messageService.add({
          severity: 'error',
          summary: 'Confirm password did not match!'
        })
      } else {
        this.userService.changeUserPassword(this.userId, passwordValues.newPassword).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Password updated successfully!'
          })
          this.dialogRef.close();
        }, () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Failed to update password!'
          })
        })
      }
    }
  }

}
