import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./main.component";
import {AuthGuard} from "../../service/auth.guard";

const routes: Routes = [
  {
    path: '',
    component :MainComponent,
    canActivate:[AuthGuard],
    children : [
      {
        path: '',
        loadChildren: () =>
          import('./clients/clients.module').then((m) => m.ClientsModule),
      },{
        path: 'users',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule { }
