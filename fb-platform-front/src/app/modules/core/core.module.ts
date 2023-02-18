import {NgModule} from "@angular/core";
import {MainComponent} from "./main.component";
import {AccountManagementComponent} from "./shared/account-management/account-management.component";
import {CommonModule} from "@angular/common";
import {CoreRoutingModule} from "./core-routing.module";
import {TopMenuModuleModule} from "../../common/top-menu-module/top-menu-module.module";
import {CardModule} from "primeng/card";
import {FlexLayoutModule} from "@angular/flex-layout";
import {ToastModule} from "primeng/toast";
import {PasswordModule} from "primeng/password";
import {ButtonModule} from "primeng/button";
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {DividerModule} from "primeng/divider";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {MessageService} from "primeng/api";
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
    BreadcrumbModule,
    ReactiveFormsModule,
    InputTextModule,
    DividerModule,
    ButtonModule,
    PasswordModule,
  ],
  providers :[MessageService]


})
export class CoreModule {
}
