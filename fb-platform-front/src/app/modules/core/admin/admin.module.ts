import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {UsersListComponent} from './components/users-list/users-list.component';
import {UserCreateComponent} from './components/user-create/user-create.component';
import {TableModule} from "primeng/table";
import {InputSwitchModule} from "primeng/inputswitch";
import {FlexModule} from "@angular/flex-layout";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {DividerModule} from "primeng/divider";
import {ReactiveFormsModule} from "@angular/forms";
import {PasswordModule} from "primeng/password";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {UserEditComponent} from './components/user-edit/user-edit.component';
import {ConfirmationService, MessageService} from "primeng/api";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {BadgeModule} from "primeng/badge";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {MenuModule} from "primeng/menu";
import {ChangePasswordComponent} from './components/change-password/change-password.component';
import {DialogService} from "primeng/dynamicdialog";
import {ToastModule} from "primeng/toast";


@NgModule({
  declarations: [
    UsersListComponent,
    UserCreateComponent,
    UserEditComponent,
    ChangePasswordComponent
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        TableModule,
        InputSwitchModule,
        FlexModule,
        ButtonModule,
        RippleModule,
        DividerModule,
        ReactiveFormsModule,
        PasswordModule,
        DropdownModule,
        InputTextModule,
        ConfirmDialogModule,
        BadgeModule,
        OverlayPanelModule,
        MenuModule,
        ToastModule
    ],
  providers: [ConfirmationService,MessageService,DialogService]

})
export class AdminModule {
}
