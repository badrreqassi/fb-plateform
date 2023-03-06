import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./main.component";
import {AccountManagementComponent} from "./shared/account-management/account-management.component";
import {AuthGuard} from "./guards/auth.guard";
import {AdminGuard} from "./guards/admin.guard";
import {ChangePasswordComponent} from "./shared/change-password/change-password.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate:[AuthGuard],
    children: [
      {
        path: 'client',
        loadChildren: () =>
          import('./clients/clients.module').then((m) => m.ClientsModule),
      },
      {
        path: 'admin',
        canActivate: [AdminGuard],
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: 'my-account',
        component: AccountManagementComponent
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {
}
