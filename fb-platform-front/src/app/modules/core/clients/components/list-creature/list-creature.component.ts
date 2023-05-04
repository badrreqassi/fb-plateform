import {Component, OnDestroy, OnInit} from '@angular/core';
import {FacebookService} from "../../../services/facebook.service";
import {Campaign} from "../../../../../models/campaign";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {CreateAdsComponent} from "../create-ads/create-ads.component";
import {Router} from "@angular/router";
import {SharingDataService} from "../../../services/sharing-data.service";
import {MessageService} from "primeng/api";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-list-creature',
  templateUrl: './list-creature.component.html',
  styleUrls: ['./list-creature.component.scss']
})
export class ListCreatureComponent implements OnInit, OnDestroy {
  disabled = true;

  user: any;

  connected = false;
  creators: Campaign[] = [];
  totalRecords = 0;
  first = 0;
  rows = 10;

  rowPerPageOptions = [5, 10, 15, 20, 50, 100];
  ref: DynamicDialogRef | undefined;

  username!: string | null;
  _subscriptions: Subscription[] = [];
  loading = false;

  constructor(private facebookService: FacebookService,
              public dialogService: DialogService,
              public router: Router,
              private sharingData: SharingDataService,
              private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.facebookService.getLoginStatus();
    setTimeout(() => {
      this.sharingData.changeMenuItem([])
    }, 0)
    this.connected = JSON.parse(localStorage.getItem('facebookAccessToken') as string)?.status == 'connected';
    this.username = localStorage.getItem("username");
    this._subscriptions.push(
    this.facebookService.authenticateUserSubject.subscribe(response => {
      console.log('response', response)
      if (response) {
        this.user = response;
        this.facebookService.getAllCampaigns().subscribe(
          response => {
            this.creators = response;
            this.totalRecords = this.creators.length;
          }
        );
        this.disabled = false;
      } else {
        this.creators = [];
        this.disabled = true;
      }
    }));
  }

  onLogin() {
    this._subscriptions.push(this.facebookService.logWithFacebook().subscribe(() => {
      window.location.reload();
      this.messageService.add({
        severity: 'success',
        summary: 'Linked successfully',
        detail: 'Your facebook linked with your account'
      });
    }));
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
    this._subscriptions.forEach(sub => {
      sub.unsubscribe();
    })
  }


  NavigateIntoListAdSet(creator: Campaign): void {
    this.sharingData.changeMenuItem([
      {id: '1', label: 'Creators List', routerLink: '/client/campaignsTesting'},
      {id: creator.id.toString(), label: creator.name, routerLink: '/client/adSetList', queryParams: {id: creator.id}}])
    this.router.navigate(['/client/adSetList'], {queryParams: {id: creator.id}});

  }

  onChangeStatus(adSet: any) {
    this._subscriptions.push(this.facebookService.changeItemStatus(adSet).subscribe(data => {
      adSet.status = data.itemStatus;
    }, error => {
      this.messageService.add({
        severity: 'error',
        summary: error?.message,
        detail: error?.error_user_msg
      });
    }));
  }
}
