import {CampaignStatusEnum} from "../Enums/campaign-status.enum";
import {Ad} from "./ad";

export interface Campaign {
  account_id: string
  id: string;
  name: string;
  status: CampaignStatusEnum;

  ads: Ad[];
}
