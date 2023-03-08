import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {FlexLayoutModule} from "@angular/flex-layout";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TopMenuModuleModule} from "./common/top-menu-module/top-menu-module.module";
import {FacebookService} from "./modules/core/services/facebook.service";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthModule} from "./modules/auth/auth.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {JwtInterceptor} from "./interceptors/jwt.interceptor";
import {MessageService} from "primeng/api";
import {ErrorInterceptor} from "./interceptors/error.interceptor";
import {ToastModule} from "primeng/toast";
import {DialogService} from "primeng/dynamicdialog";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FlexLayoutModule,
    ButtonModule,
    HttpClientModule,
    CardModule,
    TopMenuModuleModule,
    AuthModule,
    ToastModule,

  ],
  providers: [
    FacebookService,
    MessageService,
    DialogService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
