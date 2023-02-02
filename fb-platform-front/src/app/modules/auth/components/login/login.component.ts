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
    email: new FormControl('', [Validators.required, Validators.email]),
    passWord: new FormControl('', [Validators.required]),
  });
  showPassWord = false;
  valid = true;

  constructor(  public router: Router, private Jwt : JWTsecurityService) {
  }

  ngOnInit(): void {
  }

  click($event: MouseEvent): void {
    this.showPassWord = !this.showPassWord;

  }

  onSubmit() {
    this.valid = this.loginForm.valid;
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.passWord;
    if (this.loginForm.valid) {
      console.log(email);
      console.log(password)
      this.Jwt.authenticate(email, password).subscribe((respanse) => {
        respanse ?this.router.navigate(['/CompaignsTesting']) : ''
      })

    }

  }
}


