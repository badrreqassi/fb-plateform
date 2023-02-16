import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreRoutingModule} from './core-routing.module';
import {MainComponent} from './main.component';
import {TopMenuModuleModule} from "../../common/top-menu-module/top-menu-module.module";
import {CardModule} from "primeng/card";
import {FlexLayoutModule} from "@angular/flex-layout";
import {ToastModule} from "primeng/toast";
import {FacebookService} from "./services/facebook.service";
import {MessageService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";
import {AccountManagementComponent} from "./shared/account-management/account-management.component";
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {DividerModule} from "primeng/divider";
import {ButtonModule} from "primeng/button";
import {PasswordModule} from "primeng/password";
import { ChangePasswordComponent } from './shared/change-password/change-password.component';


@NgModule({
  declarations: [
    MainComponent,
    AccountManagementComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    TopMenuModuleModule,
    CardModule,
    FlexLayoutModule,
    ToastModule,
    ReactiveFormsModule,
    InputTextModule,
    DividerModule,
    ButtonModule,
    PasswordModule,
  ],
  providers: [FacebookService, MessageService, DialogService]

})
export class CoreModule {
}
