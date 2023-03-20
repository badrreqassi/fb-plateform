import {Component, OnDestroy, OnInit} from '@angular/core';
import {FacebookService} from "../../../services/facebook.service";
import {Campaign} from "../../../../../models/campaign";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {CreateAdsComponent} from "../create-ads/create-ads.component";
import {Router} from "@angular/router";
import {SharingDataService} from "../../../services/sharing-data.service";

@Component({
  selector: 'app-list-creature',
  templateUrl: './list-creature.component.html',
  styleUrls: ['./list-creature.component.scss']
})
export class ListCreatureComponent implements OnInit, OnDestroy {
  disabled = true;

  user: any;

  loggedIn = false;
  creators: Campaign[] = [];
  totalRecords = 0;
  first = 0;
  rows = 10;

  rowPerPageOptions = [5, 10, 15, 20, 50, 100];
  ref: DynamicDialogRef | undefined;

  username!: string | null;

  constructor(private facebookService: FacebookService,
              public dialogService: DialogService,
              public router: Router,
              private sharingData: SharingDataService
  ) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.sharingData.changeMenuItem([])
    }, 0)
    this.username = localStorage.getItem("username");
    this.facebookService.getLoginStatus();
    this.facebookService.authenticateUserSubject.subscribe(response => {
      if (response) {
        this.user = response;
        this.facebookService.getAllCampaigns().subscribe(
          response => {
            this.creators = response;
            this.totalRecords = this.creators.length;
          }
        );
        this.loggedIn = true;
        this.disabled = false;
      } else {
        this.loggedIn = false;
        this.disabled = true;
      }
    });
  }

  onLogin() {
    this.facebookService.logWithFacebook();
  }

  show() {
    this.ref = this.dialogService.open(CreateAdsComponent, {
      width: '60%',
      showHeader: false,
      contentStyle: {"max-height": "920px", "overflow": "auto", "border-radius": "10px"},
      baseZIndex: 10000
    });

  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }


  NavigateIntoListAdSet(creator: Campaign): void {
    this.sharingData.changeMenuItem([
      {id: '1', label: 'Campaigns List', routerLink: '/client/campaignsTesting'},
      {id: creator.id.toString(), label: creator.name, routerLink: '/client/adSetList', queryParams: {id: creator.id}}])
    this.router.navigate(['/client/adSetList'], {queryParams: {id: creator.id}});

  }
}
