import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {User} from "../../../../../models/User";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  userForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl(null, [Validators.required]),
  });

  user = {} as User

  roles = [
    {
      id: 1,
      name: 'ADMIN'
    },
    {
      id: 2,
      name: 'USER'
    }
  ];

  constructor(private userService: UserService,
              private dialogRef: DynamicDialogRef,
              private dialogConfig: DynamicDialogConfig,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    if (this.dialogConfig.data) {
      this.user = this.dialogConfig.data;
      this.userForm.setValue({
        username: this.user.username,
        lastName: this.user.lastName,
        firstName: this.user.firstName,
        email: this.user.email,
        role: this.user.roles.length > 1 ? this.roles[0] : this.roles[1]
      })
    }
  }

  onSubmit() {
    this.userForm.markAllAsTouched();
    if (this.userForm.valid){
      const userValue = this.userForm.value;
      console.log('userValue', userValue)
      let roles = [];
      if (userValue.role.id == 1){
        // add ADMIN & USER roles
        roles.push(1);
        roles.push(2);
      }else {
        // add USER role
        roles.push(2)
      }
      if (this.user?.id){
        this.userService.updateUser( this.user.id,{
          username: userValue.username,
          email: userValue.email,
          lastName: userValue.lastName,
          firstName: userValue.firstName,
          roles: roles,
        }).subscribe(() => {
          this.dialogRef.close();
          this.messageService.add({
            severity: 'success',
            summary: 'User updated successfully!',
          })
        }, () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error while updating User!',
          })
        });
      }
    }
  }

}
