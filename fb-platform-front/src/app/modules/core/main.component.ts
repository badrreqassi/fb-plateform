import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {SharingDataService} from "./services/sharing-data.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  items: MenuItem[] = [];
  home = {icon: 'pi pi-home' , routerLink:'/client/campaignsTesting'};
  constructor(private sharingData: SharingDataService) {
  }

  ngOnInit(): void {
    this.sharingData.items.subscribe(data => {
      this.items = data;
    });
   }

  onSelectItem(event: any):void {
    this.sharingData.getUsingItem(event.item.id)
  }
}
