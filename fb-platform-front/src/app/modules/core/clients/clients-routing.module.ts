import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListCreaturePageComponent} from "./pages/list-creature-page/list-creature-page.component";
import {AdSetListPageComponent} from "./pages/ad-set-list-page/ad-set-list-page.component";
import {AdsListPageComponent} from "./pages/ads-list-page/ads-list-page.component";

const routes: Routes = [
  {path: 'campaignsTesting', component: ListCreaturePageComponent},
  {path:'adSetList', component: AdSetListPageComponent},
  {path:'adsList', component: AdsListPageComponent},
  {path: '**', redirectTo: 'campaignsTesting'},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
