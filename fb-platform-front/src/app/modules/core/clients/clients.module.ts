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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CreateAdsComponent } from './components/create-ads/create-ads.component';
import {DialogService} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {SliderModule} from "primeng/slider";
import {CheckboxModule} from "primeng/checkbox";
import {DividerModule} from "primeng/divider";
import {FileUploadModule} from "primeng/fileupload";
import { ShowUploadFilesComponent } from './components/utils/show-upload-files/show-upload-files.component';
import {TooltipModule} from "primeng/tooltip";
import {ToastModule} from "primeng/toast";
import { ContentEmptyComponent } from './components/utils/content-empty/content-empty.component';


@NgModule({
  declarations: [
    ListCreatureComponent,
    ListCreaturePageComponent,
    CreateAdsComponent,
    ShowUploadFilesComponent,
    ContentEmptyComponent
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
    ToastModule,

  ],
  providers: [FacebookService,DialogService,MessageService]
})
export class ClientsModule { }
