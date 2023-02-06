import {Component, OnInit} from '@angular/core';
import {FacebookService} from "../../../services/facebook.service";
import {Campaign} from "../../../../../models/campaign";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {CreateAdsComponent} from "../create-ads/create-ads.component";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-list-creature',
  templateUrl: './list-creature.component.html',
  styleUrls: ['./list-creature.component.scss']
})
export class ListCreatureComponent implements OnInit {
  disabled = true;

  user: any;

  loggedIn = false;
  creators: Campaign[] = [];
  totalRecords = 0;
  first = 0;
  rows = 10;
  ref: DynamicDialogRef | undefined;

  constructor(private facebookService: FacebookService,public dialogService: DialogService ) {
  }

  ngOnInit(): void {
    this.facebookService.authenticateUserSubject.subscribe(response => {
      if (response) {
        this.user = response;
        this.facebookService.getAllCompaigns().subscribe(
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
      width: '70%',
      showHeader: false,
      contentStyle: {"max-height": "850", "overflow": "auto", "border-radius":"10px", "max-width" :"968px"},
      baseZIndex: 10000
    });

  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
