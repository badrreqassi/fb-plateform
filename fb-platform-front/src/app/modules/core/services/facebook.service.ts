import {Injectable} from '@angular/core';
import {BehaviorSubject, bindCallback, concat, from, map, Observable, reduce} from "rxjs";
import {ApiEndPoints} from "../../../constants/ApiEndPoints";
import {FacebookUser} from "../../../models/facebookUser";
import {AdAccount} from "../../../models/adAccount";
import {Campaign} from "../../../models/campaign";
import {HttpClient} from "@angular/common/http";
import {CampaignStatusEnum} from 'src/app/Enums/campaign-status.enum';
import Combination from 'src/app/models/Combination';
import {AdSet} from "../../../models/adSet";
import {Ad} from "../../../models/ad";

let PERMISSION_SCOPES = 'public_profile, pages_show_list,business_management, ads_management,ads_read,publish_video, pages_read_engagement';


@Injectable({
  providedIn: 'root'
})

export class FacebookService {
  authenticateUserSubject = new BehaviorSubject<any>(undefined);
  facebookUser = {} as FacebookUser;

  constructor(private http: HttpClient) {
  }

  accountId = "";

  initFacebook() {
    FB.init({
      appId: '864152144854304',
      xfbml: true,
      cookie: true,
      version: 'v15.0'
    });

    FB.getLoginStatus((response) => {
      if (response.status === 'connected') {
        this.storeLoggedUser();
      } else {
        console.error('Couldn\'t authenticate to Facebook');
      }
    });
  }

  logWithFacebook() {
    FB.init({
      appId: '864152144854304',
      xfbml: true,
      cookie: true,
      version: 'v15.0'
    });

    return from(new Promise(resolve => {
      FB.login(response => {
        localStorage.setItem('facebookAccessToken', JSON.stringify(response));
        if (response.status === "connected") {
          if (this.facebookUser) {
            this.facebookUser.authResponse = response.authResponse;
          }
          this.storeLoggedUser();
          resolve(response);
        }
      }, {scope: PERMISSION_SCOPES});
    }));
  }


  getLoginStatus() {
    FB.getLoginStatus((response => {
      console.log('login status', response)
      if (response.status === "connected") {
        if (this.facebookUser) {
          this.facebookUser.authResponse = response.authResponse;
        }
        this.storeLoggedUser();
      } else {
        this.facebookUser = {} as FacebookUser;
      }
    }))
  }


  storeLoggedUser() {
    FB.api(`${ApiEndPoints.ME}?fields=id,name,adaccounts`, (response: {
      id: number,
      name: string,
      adaccounts: { data: AdAccount[] }
    }) => {
      if (this.facebookUser?.authResponse) {
        this.facebookUser.id = response?.id;
        this.facebookUser.name = response?.name;
        this.facebookUser.adAccounts = response?.adaccounts.data;
        localStorage.setItem('userNameFacebook', response?.name);
        this.authenticateUserSubject.next(response);
      } else {
        this.authenticateUserSubject.next(undefined);
      }
    });
  }

  getAllCampaigns(): Observable<Campaign[]> {
    const fbApiAsObservable = bindCallback(FB.api);
    const observables: Observable<{ data: Campaign[] }>[] = [];
    this.facebookUser.campaigns = [];
    if (this.facebookUser.adAccounts){
      for (let adAccount of this.facebookUser?.adAccounts) {
        // @ts-ignore
        observables.push(fbApiAsObservable(`${adAccount.id}/campaigns?fields=account_id,id, name,status,ads{adset_id}`));
      }
    }

    return concat(...observables).pipe(
      reduce((all, res: { data: Campaign[] }) => all.concat(res.data), [] as Campaign[])
    );
  }

  getAdSetsByCampaignId(campaignId: string): any[] {
    let adSets: any[] = [];
    FB.api(`/${campaignId}?fields=id ,name, adsets{id, name, status, effective_status, created_time}`, (response: any) => {
      response.adsets.data.forEach((adset: any) => {
        let adSet = {
          id: adset?.id,
          name: adset?.name,
          status: adset?.effective_status,
          created_time: adset?.created_time
        } as AdSet;
        FB.api(`/${adset?.id}/insights?fields=account_currency,spend,cpc,video_avg_time_watched_actions,video_p25_watched_actions,video_p50_watched_actions,video_p75_watched_actions,video_p95_watched_actions,frequency,cpm,interactive_component_tap,impressions&date_preset=maximum`, (response: any) => {
          if (response.data?.length > 0) {
            adSet.spend = response.data[0]?.spend;
            adSet.cost_per_results = response.data[0]?.cpc;
            adSet.currency = response.data[0]?.account_currency;
            if (response.data[0]?.video_avg_time_watched_actions?.length > 0) {
              adSet.avg_vid_play_time = response.data[0]?.video_avg_time_watched_actions[0]?.value;
            }
            if (response.data[0]?.video_p25_watched_actions?.length > 0) {
              adSet.video_playback_25 = response.data[0]?.video_p25_watched_actions[0]?.value;
            }
            if (response.data[0]?.video_p50_watched_actions?.length > 0) {
              adSet.video_playback_50 = response.data[0]?.video_p50_watched_actions[0]?.value;
            }
            if (response.data[0]?.video_p75_watched_actions?.length > 0) {
              adSet.video_playback_75 = response.data[0]?.video_p75_watched_actions[0]?.value;
            }
            if (response.data[0]?.video_p95_watched_actions?.length > 0) {
              adSet.video_playback_95 = response.data[0]?.video_p95_watched_actions[0]?.value;
            }
            adSet.engagement_rate = response.data[0]?.frequency;
            if (response.data[0]?.interactive_component_tap?.length > 0) {
              adSet.interaction_page = response.data[0]?.interactive_component_tap[0]?.value;
            }
            adSet.cpm = response.data[0]?.cpm;
            adSet.impressions = response.data[0]?.impressions;
          }
        })
        adSets.push(adSet);
      })
    })
    return adSets;
  }

  changeItemStatus(item: any): Observable<any> {
    return from(new Promise((resolve, reject) => {
      if (item.status !== 'ACTIVE') {
        FB.api(`/${item.id}`, 'post', {status: "ACTIVE"}, (response: any) => {
          if (response?.error) {
            reject(response?.error)
          } else {
            response.itemStatus = 'ACTIVE';
            resolve(response);
          }
        });
      } else {
        FB.api(`/${item.id}`, 'post', {status: "PAUSED"}, (response: any) => {
          if (response?.error) {
            reject(response?.error)
          } else {
            response.itemStatus = 'PAUSED';
            resolve(response);
          }
        });
      }
    }));
  }

  getAdsByAdSetId(adSetId: string): any[] {
    let ads: any[] = [];
    FB.api(`/${adSetId}?fields=id ,name, ads{id,name,status,creative{id,title, status,video_id},effective_status,created_time}`, (response: any) => {
      response.ads.data.forEach((item: any) => {
        let ad = {
          id: item?.id,
          name: item?.name,
          title: item?.creative?.title,
          status: item?.effective_status,
          created_time: item?.created_time,
          video: item?.creative?.video_id
        } as Ad;
        FB.api(`/${item?.id}/insights?fields=account_currency,spend,cpc,video_avg_time_watched_actions,video_p25_watched_actions,video_p50_watched_actions,video_p75_watched_actions,video_p95_watched_actions,video_p100_watched_actions,frequency,cpm,interactive_component_tap,impressions&date_preset=maximum`, (response: any) => {
          if (response.data?.length > 0) {
            ad.spend = response.data[0]?.spend;
            ad.cost_per_results = response.data[0]?.cpc;
            ad.currency = response.data[0]?.account_currency;
            if (response.data[0]?.video_avg_time_watched_actions?.length > 0) {
              ad.avg_vid_play_time = response.data[0]?.video_avg_time_watched_actions[0]?.value;
            }
            if (response.data[0]?.video_p25_watched_actions?.length > 0) {
              ad.video_playback_25 = response.data[0]?.video_p25_watched_actions[0]?.value;
            }
            if (response.data[0]?.video_p50_watched_actions?.length > 0) {
              ad.video_playback_50 = response.data[0]?.video_p50_watched_actions[0]?.value;
            }
            if (response.data[0]?.video_p75_watched_actions?.length > 0) {
              ad.video_playback_75 = response.data[0]?.video_p75_watched_actions[0]?.value;
            }
            if (response.data[0]?.video_p95_watched_actions?.length > 0) {
              ad.video_playback_95 = response.data[0]?.video_p95_watched_actions[0]?.value;
            }
            if (response.data[0]?.video_p100_watched_actions?.length > 0) {
              ad.video_playback_100 = response.data[0]?.video_p100_watched_actions[0]?.value;
            }
            ad.engagement_rate = response.data[0]?.frequency;
            if (response.data[0]?.interactive_component_tap?.length > 0) {
              ad.interaction_page = response.data[0]?.interactive_component_tap[0]?.value;
            }
            ad.cpm = response.data[0]?.cpm;
            ad.impressions = response.data[0]?.impressions;
          }
        })
        ads.push(ad);
      })
    })
    return ads;
  }

  logoutFacebook() {
    return from(new Promise((resolve) => {
      FB.logout((response) => {
        this.authenticateUserSubject.next(undefined);
        localStorage.removeItem('facebookAccessToken');
        this.facebookUser = {} as FacebookUser;
        resolve(response);
      });
    }))

  }

  getAdSetById(adsetId: number): Observable<any> {
    return from(new Promise((resolve) => {
      FB.api(`/${adsetId}?fields=name,campaign_id,billing_event,targeting,daily_budget,account_id,promoted_object,optimization_goal,destination_type,bid_strategy`, (response: any) => {
        resolve(response);
        this.accountId = response.account_id;
      });
    }));
  }

  getVideoSrcByVideoId(videoId: string): Observable<any> {
    return from(new Promise((resolve) => {
      FB.api(`/${videoId}?fields=permalink_url,embed_html,length`, (response: any) => {
        resolve(response);
        this.accountId = response.account_id;
      });
    }));
  }

  duplicateAdSets(name: string, adSetData: any, budget: number): Observable<any> {
    const duplicateAdSetData = {
      name: name,
      campaign_id: adSetData.campaign_id,
      daily_budget: budget * 100, // 100 is used to convert the budget to cents
      billing_event: adSetData.billing_event,
      targeting: adSetData.targeting,
      status: CampaignStatusEnum.PAUSED,
      promoted_object: adSetData.promoted_object,
      optimization_goal: adSetData.optimization_goal,
      destination_type: adSetData.destination_type,
      bid_strategy: adSetData.bid_strategy
    };

    return from(new Promise((resolve, reject) => {
      FB.api(`/act_${this.accountId}/adsets?fields=promoted_object`, "post", duplicateAdSetData, (response: any) => {
        if (response?.error) {
          reject(response?.error)
        } else {
          resolve(response);
        }
      });
    }));
  }


  createVideo(videoFile: File): Observable<any> {
    const videoData = new FormData();
    videoData.append("source", videoFile);
    const authResponse = FB.getAuthResponse();
    return this.http
      .post(
        `https://graph.facebook.com/v16.0/act_${this.accountId}/advideos?access_token=${authResponse?.accessToken}`,
        videoData
      )
      .pipe(
        map((result: any) => result.id)
      );
  }


  createThumbNail(thumbnailFile: File): Observable<any> {
    const thumbnailData = new FormData();
    thumbnailData.append("file", thumbnailFile, thumbnailFile.name);
    const authResponse = FB.getAuthResponse();
    return this.http
      .post(
        `https://graph.facebook.com/v16.0/act_${this.accountId}/adimages?access_token=${authResponse?.accessToken}`,
        thumbnailData
      )
      .pipe(
        map((result: any) => ({
          hash: result.images[thumbnailFile.name].hash,
          url: result.images[thumbnailFile.name].url
        }))
      );
  }

  getVideoStatus(videoId: string): Observable<any> {
    const authResponse = FB.getAuthResponse();
    return this.http
      .get(
        `https://graph.facebook.com/v16.0/${videoId}?fields=status&access_token=${authResponse?.accessToken}`
      )
      .pipe(
        map((result: any) => result.status.video_status)
      );
  }

  createAd(adset: any, combiniation: Combination, index: number): Observable<any> {
    const suffix = index + 1;
    const ad = {
      name: `Ad ${suffix}`,
      creative: {
        name: `Creative ${suffix}`,
        asset_feed_spec: {
          titles: combiniation.titles.map(t => ({text: t.name})),
          optimization_type: 'DEGREES_OF_FREEDOM',
        },
        object_story_spec: {
          page_id: adset.promoted_object?.page_id,
          video_data: {
            video_id: combiniation.videoId,
            call_to_action: {
              type: 'MESSAGE_PAGE',
              value: {
                app_destination: 'MESSENGER',
                link: 'https://fb.com/messenger_doc/',
              },
            },
            image_hash: combiniation.thumbnail?.hash,
          },
        },
      },
      adset_id: adset.id,
      status: CampaignStatusEnum.PAUSED,
    };
    return from(new Promise((resolve, reject) => {
      FB.api(`/act_${this.accountId}/ads?fields=name,creative,tracking_specs,adset`, "post", ad, (response: any) => {
        if (response?.error) {
          reject(response?.error)
        } else {
          resolve(response);
        }
      });
    }));
  }
}
