import {Component, Input, OnInit} from '@angular/core';
import {CampaignStatusEnum} from "../../../../../../Enums/campaign-status.enum";

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
   status : string | undefined;
  @Input() set value (val :string | undefined){
    this.status = val;
    switch (val) {
      case CampaignStatusEnum.ACTIVE : {
        this.colorStatus= 'success'
        break;
      }
      case CampaignStatusEnum.PAUSED : {
        this.colorStatus= 'warning'
        break;
      }
      case CampaignStatusEnum.DELETED : {
        this.colorStatus= 'danger'
        break;
      }
      case CampaignStatusEnum.ARCHIVED : {
        this.colorStatus= ''
        break;
      }
      default :{
        this.colorStatus= 'warning'
        break
      }
    }
  };
  colorStatus  = ''

  constructor() {
  }

  ngOnInit(): void {

  }

}
