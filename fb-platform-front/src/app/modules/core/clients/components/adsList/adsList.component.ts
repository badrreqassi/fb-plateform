import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MenuItem} from "primeng/api";
import {SharingDataService} from "../../../services/sharing-data.service";
import {Ad} from "../../../../../models/ad";
import Chart, {ChartType} from 'chart.js/auto';
import {CampaignStatusEnum} from "../../../../../Enums/campaign-status.enum";
import _default from "chart.js/dist/plugins/plugin.tooltip";
import opacity = _default.defaults.animations.opacity;

@Component({
  selector: 'app-ads-list',
  templateUrl: './adsList.componet.html',
  styleUrls: ['./adsList.component.scss']
})
export class AdsListComponent implements OnInit {
  totalRecords = 0;
  first = 0;
  rows = 10;
  items: MenuItem[] = [];
  cols = [
    {field: 'name', header: 'Name ads '},
    {field: 'title', header: 'Title'},
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
    {field: 'couverture', header: 'Impression'},
    {field: 'impression', header: 'Date de création'},
  ];
  adsList: Ad[] = [{
    name: 'ads Test 1 V1',
    status: CampaignStatusEnum.ACTIVE,
    title: 'Titre 1 ',
    id: '18745242',
    thumbnails: 'thumbnails 1',
    video: 'video 1',
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

  }, {
    name: 'ads Test 1 V1',
    status: CampaignStatusEnum.ACTIVE,
    title: 'Titre 2 ',
    id: '187452472',
    thumbnails: 'thumbnails 1',
    video: 'video 1',
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

  }, {
    name: 'ads Test 1 V2',
    status: CampaignStatusEnum.ACTIVE,
    title: 'Titre 1 ',
    id: '1845242',
    thumbnails: 'thumbnails 1',
    video: 'video 1',
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

  }, {
    name: 'ads Test 1 V3',
    status: CampaignStatusEnum.ACTIVE,
    title: 'Titre 1 ',
    id: '1874442',
    thumbnails: 'thumbnails 1',
    video: 'video 1',
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

  }, {
    name: 'ads Test 1 V3',
    status: CampaignStatusEnum.ACTIVE,
    title: 'Titre 2 ',
    id: '182245242',
    thumbnails: 'thumbnails 1',
    video: 'video 1',
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

  }, {
    name: 'ads Test 1 V3',
    status: CampaignStatusEnum.ACTIVE,
    title: 'Titre 3 ',
    id: '1871242',
    thumbnails: 'thumbnails 1',
    video: 'video 1',
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

  videoSelection: any;
  titre = 'Eternal Sunshine of the Spotless Mind';

  private chart!: Chart<ChartType, string[], unknown> ;

  name: string = '';
  adId: string = '';
  openChart: boolean = false;
   selectItem = {} as Ad;

  constructor(private activatedRoute: ActivatedRoute,
              private sharingData: SharingDataService,

  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((data) => {
      this.adId = data['id']
    })
    if (this.items.length === 0) {
      this.items = JSON.parse(localStorage.getItem('menu') as string);
      setTimeout(() => {
        this.sharingData.changeMenuItem(this.items)
      }, 0)
    }
    this.name = (this.items.find(el => el.id === this.adId)?.label) as string


  }


  onRowSelect(event: any): void {
    this.selectItem = event.data;
    console.log(this.selectItem);
     setTimeout(() => {
       if(this.chart?.ctx){
         console.log(this.chart)
        this.chart.data.labels = ['1', '2', '3', '4',
          '5','11','12','13','14'] ;
        this.chart.update();
       }else {
         this.chart = new Chart("MyChart", {
           type: 'line', //this denotes tha type of chart  type :  scatter

           data: {// values on X-Axis
             labels: ['1', '2', '3', '4',
               '5', '8', '9', '10', '11'],

             datasets: [
               {
                 label: "ADS",
                 data: ['2667', '5786', '1572', '1179', '1192',
                   '8574', '1573', '1576', '1576'],
                 fill: true,
                 backgroundColor: [
                   'rgba(191,219,254,0.5)'
                 ],
                 borderColor: [
                   'rgba(191,219,254,0.5)',
                 ],
                 borderWidth: 2
               }
             ]
           },
           options: {

             maintainAspectRatio: false,
             responsive: true,
             plugins: {
               title: {
                 display: true,
                 text: 'Statictic of Ads' + this.titre
               },
               tooltip: {
                 callbacks: {
                   label: function (context) {
                     let label = context.dataset.label || '';

                     if (label) {
                       label += ': ';
                     }
                     if (context.parsed.y !== null) {
                       const index = context.dataIndex;
                       const value = context.dataset.data[index];
                       // label += new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(context.parsed.y);
                       // @ts-ignore
                       label += value > 2000 ? ' this part is good' : 'this part is bad';
                     }
                     return label;
                   }
                 }
               },
             },

             scales: {
               x: {
                 border: {
                   color: 'red'
                 },
                 title: {
                   color: 'bleu',
                   display: true,
                   text: 'time'
                 }
               },
               y: {
                 suggestedMin: 0,
                 suggestedMax: 10000,
                 title: {

                   display: true,
                   text: 'audience'
                 }

               }
             }
           }

         });
       }

     })

    this.openChart = true
  }

  close($event?: any): void {
    this.chart.destroy() ; this.openChart = false


  }
}


