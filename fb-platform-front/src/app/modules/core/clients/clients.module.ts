import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ListCreatureComponent } from './components/list-creature/list-creature.component';
import { ListCreaturePageComponent } from './pages/list-creature-page/list-creature-page.component';
import {FlexModule} from "@angular/flex-layout";
import {ButtonModule} from "primeng/button";
import {FacebookService} from "../services/facebook.service";
import {TableModule} from "primeng/table";
import {InputSwitchModule} from "primeng/inputswitch";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ListCreatureComponent,
    ListCreaturePageComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    FlexModule,
    ButtonModule,
    TableModule,
    InputSwitchModule,
    FormsModule
  ],
  providers: []
})
export class ClientsModule { }
