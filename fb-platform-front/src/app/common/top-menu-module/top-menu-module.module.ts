import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TopMenuComponent} from './top-menu/top-menu.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MenuModule} from "primeng/menu";


@NgModule({
  declarations: [
    TopMenuComponent,
  ],
  exports: [
    TopMenuComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MenuModule,
  ]
})
export class TopMenuModuleModule {
}
