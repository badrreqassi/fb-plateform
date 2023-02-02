import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { MainComponent } from './main.component';
import {TopMenuModuleModule} from "../../common/top-menu-module/top-menu-module.module";
import {CardModule} from "primeng/card";
import {FlexLayoutModule} from "@angular/flex-layout";


@NgModule({
  declarations: [
    MainComponent
  ],
    imports: [
        CommonModule,
        CoreRoutingModule,
        TopMenuModuleModule,
        CardModule,
        FlexLayoutModule
    ]
})
export class CoreModule { }
