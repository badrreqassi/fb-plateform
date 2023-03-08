import {Ad} from "./ad";

export interface AdSet {
  id?: string;
  name?: string;
  status?: string;
  spend?: number;
  cost_per_results?: number
  avg_vid_play_time?: number;
  video_playback_25?: number
  video_playback_50?: number
  video_playback_75?: number
  video_playback_95?: number
  engagement_rate?: string;
  interaction_page?: string;
  cpm?: string;
  couverture?: string
  impressions?: string
  ads?: Ad[];
}
