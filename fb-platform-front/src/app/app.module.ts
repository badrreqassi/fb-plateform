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
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInerceptorService} from "./service/token-inerceptor.service";


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
    HttpClientModule,

  ],
  providers: [
    FacebookService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInerceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
