import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {JWTsecurityService} from "../../service/jwtsecurity.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    passWord: new FormControl('', [Validators.required]),
  });
  showPassWord = false;
  valid = true;
  errorMessage = '';


  constructor(public router: Router,
              private Jwt: JWTsecurityService,
  ) {
  }

  ngOnInit(): void {
  }

  click($event: MouseEvent): void {
    this.showPassWord = !this.showPassWord;
  }

  onSubmit() {
    this.valid = this.loginForm.valid;
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.passWord;
    if (this.loginForm.valid) {
      this.Jwt.authenticate(username, password).subscribe(res => {
        this.errorMessage = ''
      }, error => {
        this.errorMessage = 'Username or Password is not valid';
      })

    }
  }
}


