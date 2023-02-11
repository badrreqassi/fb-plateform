import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

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
      name: 'User'
    },
    {
      id: 2,
      name: 'Administrator'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {}

}
