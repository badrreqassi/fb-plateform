import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AdSet} from "../../../../../models/adSet";
import {CreateAdsComponent} from "../create-ads/create-ads.component";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {MenuItem} from "primeng/api";
import {SharingDataService} from "../../../services/sharing-data.service";
import {FacebookService} from "../../../services/facebook.service";


@Component({
  selector: 'app-ad-set-list',
  templateUrl: './ad-set-list.component.html',
  styleUrls: ['./ad-set-list.component.scss']
})
export class AdSetListComponent implements OnInit {
  adSetList: AdSet[] = [];
  totalRecords = 0;
  first = 0;
  rows = 10;
  items: MenuItem[] = [];
  cols = [
    {field: 'name', header: 'Ad name '},
    {field: 'status', header: 'Diffusion'},
    {field: 'spend', header: 'Money spent'},
    {field: 'cost_per_results', header: 'Cost per result'},
    {field: 'avg_vid_play_time', header: 'AVG video playing time'},
    {field: 'video_playback_25', header: 'Video playing 25%'},
    {field: 'video_playback_50', header: 'Video playing 50%'},
    {field: 'video_playback_75', header: 'Video playing 75%'},
    {field: 'video_playback_95', header: 'Video playing 95%'},
    {field: 'engagement_rate', header: 'Engagement rate'},
    {field: 'interaction_page', header: 'Page interaction'},
    {field: 'cpm', header: 'CPM'},
    {field: 'impressions', header: 'Impressions'},
    {field: 'created_time', header: 'Creation Date'},
  ];
  ref: DynamicDialogRef | undefined;
  campaignId = '';
  name = ''

  constructor(private activatedRoute: ActivatedRoute,
              public facebookService: FacebookService,
              public dialogService: DialogService,
              private sharingData: SharingDataService,
              private activatedroute: ActivatedRoute,
              public router: Router
  ) {
    this.sharingData.items.subscribe((data) => {
      this.items = data;

    })
  }


  ngOnInit(): void {
    this.activatedroute.queryParams.subscribe((data) => {
      this.campaignId = data['id'];
      this.adSetList = this.facebookService.getAdSetsByCampaignId(this.campaignId);
    })
    if (this.items.length === 0) {
      this.items = JSON.parse(localStorage.getItem('menu') as string);
      setTimeout(() => {
        this.sharingData.changeMenuItem(this.items)
      }, 0)
    }
    this.name = (this.items.find(el => el.id === this.campaignId)?.label) as string

  }


  show() {
    this.ref = this.dialogService.open(CreateAdsComponent, {
      width: '60%',
      showHeader: false,
      contentStyle: {"max-height": "920px", "overflow": "auto", "border-radius": "10px"},
      baseZIndex: 10000
    });

  }

  NavigateIntoListAds(adSet: AdSet): void {

    this.items.push({
        id: adSet.id,
        label: adSet.name,
        routerLink: '/client/adsList',
        queryParams: {id: adSet.id},
      }
    );
    this.sharingData.changeMenuItem(this.items)

    this.router.navigate(['/client/adsList'], {queryParams: {id: adSet.id}});

  }

}
