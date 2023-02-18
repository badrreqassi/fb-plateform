import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './components/login/login.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {CardModule} from "primeng/card";
import {FlexModule} from "@angular/flex-layout";
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {TagModule} from "primeng/tag";
import {ButtonModule} from "primeng/button";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    LoginComponent,
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    CardModule,
    FlexModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    TagModule,
    ButtonModule,
    HttpClientModule,
  ],

})
export class AuthModule {
}
