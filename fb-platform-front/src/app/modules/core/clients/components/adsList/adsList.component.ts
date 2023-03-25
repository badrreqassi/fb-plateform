import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MenuItem, MessageService} from "primeng/api";
import {SharingDataService} from "../../../services/sharing-data.service";
import {Ad} from "../../../../../models/ad";
import Chart from 'chart.js/auto';
import {FacebookService} from "../../../services/facebook.service";

@Component({
  selector: 'app-ads-list',
  templateUrl: './adsList.component.html',
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
  adsList: Ad[] = [];

  videoSelection: any;
  title = 'Eternal Sunshine of the Spotless Mind';
  status: any;

  private chart!: Chart<"bar" | "line" | "scatter" | "bubble" | "pie" | "doughnut" | "polarArea" | "radar", number[], unknown>;

  name: string = '';
  adSetId: string = '';
  openChart: boolean = false;
  selectedAd = {} as Ad;

  @ViewChild('videoFrame') videoFrame!: ElementRef;

  constructor(private activatedRoute: ActivatedRoute,
              private facebookService: FacebookService,
              private sharingData: SharingDataService,
              private messageService: MessageService

  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((data) => {
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
    if (event?.data?.video == undefined) {
      this.close();
    } else {
      this.chart?.destroy();
      this.selectedAd = event.data;
      this.title = event.data?.title;
      this.status = event.data?.status;
      if (event?.data?.video) {
        this.videoSelection = true;
        this.facebookService.getVideoSrcByVideoId(event.data.video).subscribe((response: any) => {
          if (this.videoFrame?.nativeElement?.innerHTML != undefined) {
            this.videoFrame.nativeElement.innerHTML = response.embed_html;
            event.data.video_length = response.length;
          }
        });
      } else {
        this.videoSelection = false;
      }
      setTimeout(() => {
        this.chart = new Chart("MyChart", {
          type: 'line',
          data: {
            labels: [this.getTimeByPercentage(event?.data?.video_length, 25), this.getTimeByPercentage(event?.data?.video_length, 50), this.getTimeByPercentage(event?.data?.video_length, 75), this.getTimeByPercentage(event?.data?.video_length, 95), this.getTimeByPercentage(event?.data?.video_length, 100)],
            datasets: [{
              label: 'video watched',
              data: [event?.data?.video_playback_25, event?.data?.video_playback_50, event?.data?.video_playback_75, event?.data?.video_playback_95, event?.data?.video_playback_100],
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            }]
          },
          options: {
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'time (m)'
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'audience'
                }

              }
            }
          }
        })
      }, 1000)

      this.openChart = true
    }
  }

  getTimeByPercentage(videoLength: number, percentage: number): string {
    return (((videoLength * percentage) / 60) / 100).toFixed(2);
  }

  close($event?: any): void {
    this.selectedAd = {};
    this.chart?.destroy();
    this.openChart = false
  }


  onChangeStatus(adSet: any) {
    this.facebookService.changeItemStatus(adSet).subscribe(data => {
      adSet.status = data.itemStatus;
    }, error => {
      this.messageService.add({
        severity: 'error',
        summary: error?.message,
        detail: error?.error_user_msg
      });
    });
  }
}


