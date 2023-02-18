import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Routes} from "@angular/router";
import {AdSet} from "../../../../../models/adSet";
import {CampaignStatusEnum} from "../../../../../Enums/campaign-status.enum";
import {StatisticsResults} from "../../../../../models/StatisticsResults";
import {CreateAdsComponent} from "../create-ads/create-ads.component";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {MenuItem} from "primeng/api";
import {Campaign} from "../../../../../models/campaign";
import {SharingDataService} from "../../../services/sharing-data.service";


@Component({
  selector: 'app-ad-set-list',
  templateUrl: './ad-set-list.component.html',
  styleUrls: ['./ad-set-list.component.scss']
})
export class AdSetListComponent implements OnInit {
  adSetList: AdSet[] = [{
    adSetId: '1274118596',
    ads: [],
    name: 'ads Test 1',
    cimpaignId: '123',
    status: CampaignStatusEnum.ACTIVE,
    budget: 100,
    couverture: 'couverture',
    cpm: 'cpm',
    avg_vid_play_time: 15,
    cost_per_results: 7,
    engagement_rate: 'engagement_rate',
    impression: 'impression',
    interaction_page: 'interaction_page',
    video_playback_25: 15,
    video_playback_50: 44,
    video_playback_75: 42,
    video_playback_95: 12

  }];
  totalRecords = 0;
  first = 0;
  rows = 10;
  items: MenuItem[] = [];
  cols = [
    {field: 'name', header: 'name'},
    {field: 'status', header: 'Diffusion'},
    {field: 'budget', header: 'Montant dépensé'},
    {field: 'cost_per_results', header: 'Cout par résultat'},
    {field: 'avg_vid_play_time', header: 'Durée moy lecture vid'},
    {field: 'video_playback_25', header: 'Lecture video 25%'},
    {field: 'video_playback_50', header: 'Lecture video 50%'},
    {field: 'video_playback_75', header: 'Lecture video 75%'},
    {field: 'video_playback_95', header: 'Lecture video 95%'},
    {field: 'engagement_rate', header: 'Taux d\'engagement'},
    {field: 'interaction_page', header: 'Intération avec page'},
    {field: 'cpm', header: 'CPM'},
    {field: 'Impression', header: 'Impression'},
    {field: '01/01/2023', header: 'Date de création'},
  ];
  ref: DynamicDialogRef | undefined;
  adSetId = '';
  name = ''

  constructor(private activatedRoute: ActivatedRoute,
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
      this.adSetId = data['id']
    })
    if (this.items.length === 0) {
      this.items = JSON.parse(localStorage.getItem('menu') as string);
      setTimeout(() => {
        this.sharingData.changeMenuItem(this.items)
      }, 0)
    }
    this.name = (this.items.find(el => el.id === this.adSetId)?.label) as string

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
        id: adSet.adSetId.toString(),
        label: adSet.name,
        routerLink: '/client/adsList',
        queryParams: {id: adSet.adSetId},
      }
    );
    this.sharingData.changeMenuItem(this.items)

    this.router.navigate(['/client/adsList'], {queryParams: {id: adSet.adSetId}});

  }

}
