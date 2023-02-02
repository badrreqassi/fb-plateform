import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListCreaturePageComponent} from "./pages/list-creature-page/list-creature-page.component";

const routes: Routes = [
  {path: '', component:ListCreaturePageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
