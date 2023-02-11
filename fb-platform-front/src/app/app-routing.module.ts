import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from "./app.component";

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'Auth',
        loadChildren: () =>
          import('./modules/auth/auth.module').then((m) => m.AuthModule),
      }, {
        path: '',
        loadChildren: () =>
          import('./modules/core/core.module').then((m) => m.CoreModule),
      }, {
        path: '**',
        redirectTo: 'Auth/login',
      }
      // TODO
      /* {
         path: 'page-not-found',
         component: PageNotFoundComponent,
       },
       {
         path: 'page-error-internal',
         component: PageErrorInternalComponent,
       },
       {
         path: 'page-authorisation-required',
         component: PageNotAuthorizedComponent,
       },*/
    ],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
