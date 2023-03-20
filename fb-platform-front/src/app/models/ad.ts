export interface Ad {

  /*
    adset_id: string
  */
  id?: string;
  name?: string;
  spend?: number;
  video?: string;
  video_length?: number;
  thumbnails?: string;
  title?: string;
  /* StatisticsResults: StatisticsResults;*/
  cost_per_results?: number
  avg_vid_play_time?: number;
  video_playback_25?: number;
  video_playback_50?: number;
  video_playback_75?: number;
  video_playback_95?: number;
  video_playback_100?: number;

  engagement_rate?: string;

  interaction_page?: string;

  cpm?: string;

  currency?: string
  impressions?: string
  status?: string;


}
