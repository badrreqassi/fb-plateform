import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MenuItem} from "primeng/api";
import {SharingDataService} from "../../../services/sharing-data.service";
import {Ad} from "../../../../../models/ad";
import Chart, {ChartType} from 'chart.js/auto';
import {CampaignStatusEnum} from "../../../../../Enums/campaign-status.enum";
import {FacebookService} from "../../../services/facebook.service";

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
    {field: 'name', header: 'Ad name '},
    {field: 'title', header: 'Title'},
    {field: 'status', header: 'Diffusion'},
    {field: 'spent', header: 'Money spent'},
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
  adsList: Ad[] = [];

  videoSelection: any;
  title = 'Eternal Sunshine of the Spotless Mind';
  status: any;

  selectedAd = {} as Ad;

  // chart primeng
  /*basicData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: '#42A5F5',
        tension: .10
      },
      {
        label: 'Second Dataset',
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: false,
        borderColor: '#FFA726',
        tension: .10
      }
    ]
  };
  basicOptions = {
    plugins: {
      legend: {
        labels: {
          color: '#495057'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#495057'
        },
        grid: {
          color: '#ebedef'
        }
      },
      y: {
        ticks: {
          color: '#495057'
        },
        grid: {
          color: '#ebedef'
        }
      }
    }
  };*/
  private chart!: Chart<ChartType, string[], unknown> ;

  name: string = '';
  adSetId: string = '';
  openChart: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private facebookService: FacebookService,
              private sharingData: SharingDataService,
              private activatedroute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.activatedroute.queryParams.subscribe((data) => {
      this.adSetId = data['id']
      this.adsList = this.facebookService.getAdsByAdSetId(this.adSetId);
      setTimeout(() => {
        this.totalRecords = this.adsList.length;
      }, 500);
    })
    if (this.items.length === 0) {
      this.items = JSON.parse(localStorage.getItem('menu') as string);
      setTimeout(() => {
        this.sharingData.changeMenuItem(this.items)
      }, 0)
    }
    this.name = (this.items.find(el => el.id === this.adSetId)?.label) as string
  }


  onRowSelect(event: any): void {
    this.selectedAd = event.data;
    this.title = event.data?.title;
    this.status = event.data?.status;
     setTimeout(() => {
       this.chart = new Chart("MyChart", {
         type: 'scatter', //this denotes tha type of chart

         data: {// values on X-Axis
           labels: ['1', '2', '3', '4',
             '5', '8', '9', '10', '11'],

           datasets: [
             {
               label: "ADS",
               data: ['2667', '5786', '1572', '1179', '1192',
                 '8574', '1573', '1576', '1576'],
               fill: false,
               borderColor: function (context) {
                 const index = context.dataIndex;
                 const value = context.dataset.data[index];
                 // @ts-ignore
                 return value < 2000 ? 'red' :  // draw negative values in red
                   'green'   // else, alternate values in blue and green
               },
               backgroundColor: function (context) {
                 const index = context.dataIndex;
                 const value = context.dataset.data[index];
                 // @ts-ignore
                 return value < 2000 ? 'red' :
                   'green'

               },
               tension: 0.1,


             },

           ]
         },
         options: {
           maintainAspectRatio: false,
           responsive: true,
           plugins: {
             title: {
               display: true,
               text: 'Statictic of Ads' + this.title
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
     })

    this.openChart = true
  }

  close($event?: any): void {
    this.chart.destroy() ; this.openChart = false


  }
}


