import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SecurityService} from "../../services/security.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    passWord: new FormControl('', [Validators.required]),
  });
  showPassWord = false;
  valid = true;

  constructor(private securityService : SecurityService , public router :  Router) {
  }

  ngOnInit(): void {
  }

  click($event: MouseEvent): void {
    this.showPassWord = !this.showPassWord;

  }

  onSubmit() {
    this.valid = this.loginForm.valid;
    if (this.loginForm.valid) {
      console.log('click', this.loginForm.value);
      this.router.navigate(['/clients'])
    }

  }
}


