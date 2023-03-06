import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientsRoutingModule} from './clients-routing.module';
import {ListCreatureComponent} from './components/list-creature/list-creature.component';
import {ListCreaturePageComponent} from './pages/list-creature-page/list-creature-page.component';
import {FlexModule} from "@angular/flex-layout";
import {ButtonModule} from "primeng/button";
import {FacebookService} from "../services/facebook.service";
import {TableModule} from "primeng/table";
import {InputSwitchModule} from "primeng/inputswitch";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CreateAdsComponent} from './components/create-ads/create-ads.component';
import {DialogService} from "primeng/dynamicdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {SliderModule} from "primeng/slider";
import {CheckboxModule} from "primeng/checkbox";
import {DividerModule} from "primeng/divider";
import {FileUploadModule} from "primeng/fileupload";
import {ShowUploadFilesComponent} from './components/utils/show-upload-files/show-upload-files.component';
import {TooltipModule} from "primeng/tooltip";
import { ContentEmptyComponent } from './components/utils/content-empty/content-empty.component';
import { AdSetListComponent } from './components/ad-set-list/ad-set-list.component';
import { AdSetListPageComponent } from './pages/ad-set-list-page/ad-set-list-page.component';
import {BreadcrumbModule} from "primeng/breadcrumb";
import { AdsListPageComponent } from './pages/ads-list-page/ads-list-page.component';
import {AdsListComponent} from "./components/adsList/adsList.component";
import {PasswordModule} from "primeng/password";
import {CardModule} from "primeng/card";
import {ChartModule} from "primeng/chart";
import { StatusComponent } from './components/utils/status/status.component';
import {TagModule} from "primeng/tag";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import { ConnectedAccountComponent } from './components/utils/connected-account/connected-account.component';



@NgModule({
    declarations: [
        ListCreatureComponent,
        ListCreaturePageComponent,
        CreateAdsComponent,
        ShowUploadFilesComponent,
        ContentEmptyComponent,
        ContentEmptyComponent,
        AdSetListComponent,
        AdSetListPageComponent,
        AdsListPageComponent,
        AdsListComponent,
        StatusComponent,
        ConnectedAccountComponent
    ],
    imports: [
        CommonModule,
        ClientsRoutingModule,
        FlexModule,
        ButtonModule,
        TableModule,
        InputSwitchModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        DropdownModule,
        SliderModule,
        CheckboxModule,
        DividerModule,
        FileUploadModule,
        TooltipModule,

        PasswordModule,
        BreadcrumbModule,
        CardModule,
        ChartModule,
        TagModule,
        ConfirmDialogModule,

    ],
    exports: [
        ConnectedAccountComponent
    ],
    providers: [FacebookService, DialogService, MessageService, ConfirmationService]
})
export class ClientsModule {
}
