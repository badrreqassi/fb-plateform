import {CampaignStatusEnum} from "../Enums/campaign-status.enum";
import {Ad} from "./ad";
import {StatisticsResults} from "./StatisticsResults";

export interface AdSet {
  adSetId: string
  cimpaignId: string;
  name: string;
  status: CampaignStatusEnum;
  budget: number;
  cost_per_results: number
  avg_vid_play_time: number;
  video_playback_25: number
  video_playback_50: number
  video_playback_75: number
  video_playback_95: number

  engagement_rate: string;

  interaction_page: string;

  cpm: string;

  couverture: string
  impression: string
  ads: Ad[];
}