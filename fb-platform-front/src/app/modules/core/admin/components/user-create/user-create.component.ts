import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  userForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl(null, [Validators.required]),
  });

  roles = [
    {
      id: 1,
      name: 'ADMIN',

    },
    {
      id: 2,
      name: 'USER'
    }
  ];

  constructor(private userService: UserService,
              private dialogRef: DynamicDialogRef,
              private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userForm.markAllAsTouched();
    if (this.userForm.valid){
      const userValue = this.userForm.value;
      let roles = [];
      if (userValue.role.id == 1){
        // add ADMIN & USER roles
        roles.push(1);
        roles.push(2);
      }else {
        // add USER role
        roles.push(2)
      }
      this.userService.createUser({
        username: userValue.username,
        password: userValue.password,
        email: userValue.email,
        lastName: userValue.lastName,
        firstName: userValue.firstName,
        roles: roles,
      }).subscribe(() => {
        this.dialogRef.close();
        this.messageService.add({
          severity: 'success',
          summary: 'User created successfully!',
        })
      }, () => (
        this.messageService.add({
          severity: 'error',
          summary: 'Error while creating User!',
        })
      ));
    }
  }
}
