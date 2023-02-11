import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss']
})
export class AccountManagementComponent implements OnInit {
  accountForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor() {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.accountForm.markAllAsTouched();
    if (this.accountForm.valid) {
      console.log('form is valid');
    } else {
      console.log('form is not valid');

    }
  }

  onLogin() {

  }
}
