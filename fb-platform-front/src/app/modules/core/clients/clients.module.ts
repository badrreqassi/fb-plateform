import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ListCreatureComponent } from './components/list-creature/list-creature.component';
import { ListCreaturePageComponent } from './pages/list-creature-page/list-creature-page.component';


@NgModule({
  declarations: [
    ListCreatureComponent,
    ListCreaturePageComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule
  ]
})
export class ClientsModule { }
