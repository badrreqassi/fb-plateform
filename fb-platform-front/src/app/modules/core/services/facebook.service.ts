import {Injectable} from '@angular/core';
import {BehaviorSubject, bindCallback, concat, from, map, Observable, reduce} from "rxjs";
import {ApiEndPoints} from "../../../constants/ApiEndPoints";
import {FacebookUser} from "../../../models/facebookUser";
import {AdAccount} from "../../../models/adAccount";
import {Campaign} from "../../../models/campaign";
import {HttpClient} from "@angular/common/http";

let PERMISSION_SCOPES = 'public_profile, pages_show_list, business_management, ads_management, ads_read';


@Injectable({
  providedIn: 'root'
})

export class FacebookService {
  authenticateUserSubject = new BehaviorSubject<any>(null);
  facebookUser = {} as FacebookUser;

  accountId = "";


  constructor(private http: HttpClient) {
  }

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

    FB.login(response => {
      localStorage.setItem('facebookAccessToken', JSON.stringify(response));
      if (response.status === "connected") {
        console.log('facebook', this.facebookUser)
        if (this.facebookUser) {
          this.facebookUser.authResponse = response.authResponse;
        }
        this.storeLoggedUser();
      }
    }, {scope: PERMISSION_SCOPES});
  }

  storeLoggedUser() {
    FB.api(`${ApiEndPoints.ME}?fields=id,name,adaccounts`, (response: { id: number, name: string, adaccounts: { data: AdAccount[] } }) => {
      console.log(response)
      if (this.facebookUser) {
        this.facebookUser.id = response?.id;
        this.facebookUser.name = response?.name;
        this.facebookUser.adAccounts = response?.adaccounts.data;
        this.authenticateUserSubject.next(response);
      }
    });
  }

  getPages() {
    FB.api(`${ApiEndPoints.ME}${ApiEndPoints.ACCOUNTS}?fields=name,access_token`, (response: unknown[]) => {
      console.log('pages', response)
      this.facebookUser.pages = response;
    });
  }

  getBusinessManager() {
    FB.api('/' + this.facebookUser.authResponse?.userID + ApiEndPoints.BUSINESSES, (response: unknown[]) => {
      console.log('business manager', response);
      this.facebookUser.businessManagers = response;
    });
  }

  getAllCompaigns(): Observable<Campaign[]> {
    const fbApiAsObservable = bindCallback(FB.api);
    const observables: Observable<{ data: Campaign[] }>[] = [];
    this.facebookUser.campaigns = [];
    for (let adAccount of this.facebookUser.adAccounts) {
      // @ts-ignore
      observables.push(fbApiAsObservable(`${adAccount.id}/campaigns?fields=account_id,id, name,status,ads{adset_id}`));
    }

    return concat(...observables).pipe(
      reduce((all, res: { data: Campaign[] }) => all.concat(res.data), [] as Campaign[])
    );
  }

  logoutFacebook() {
    FB.logout((response) => {
      this.authenticateUserSubject.next(null);
      this.facebookUser = {} as FacebookUser;
    });
  }

  getAdSetById(adsetId: number): Observable<any> {
    return from(new Promise((resolve) => {
      FB.api(`/${adsetId}?fields=name,campaign_id,billing_event,targeting,bid_amount,daily_budget,account_id`, (response: any) => {
        resolve(response);
        this.accountId = response.account_id;
      });
    }));
  }

  duplicateAdSets(adSetData: any): Observable<any> {
    const duplicateAdSetData = {
      name: adSetData.name + " - Copy",
      campaign_id: adSetData.campaign_id,
      bid_amount: adSetData.bid_amount,
      daily_budget: adSetData.daily_budget,
      billing_event: adSetData.billing_event,
      targeting: adSetData.targeting
    };
    return from(new Promise((resolve) => {
      FB.api(`/act_${this.accountId}/adsets?fields=name,campaign_id,billing_event`, "post", duplicateAdSetData, (response: any) => {
        resolve(response);
      });
    }));
  }


  createAdCreative(): Observable<any> {
    console.log('accountId',this.accountId)
    const adCreative = {
      name: "name of adcreative",
      body: "body of ad",
      object_story_spec: {
        page_id: "506841523177050",
        photo_data: {
          caption: "test ad 2",
          image_hash: "547f6196e4b02ce70e2e6d13ad2837e2"
        }
      }
    }
    return from(new Promise((resolve) => {
      FB.api(`/act_${this.accountId}/adcreatives?fields=id,name,object_story_spec`, "post", adCreative, (response: any) => {
        resolve(response);
      });
    }));
  }


  createAd(adsetId: string, creative_id: string): Observable<any> {

    const ad = {
      name: "Ad 3",
      creative: {
        creative_id: creative_id
      },
      tracking_specs: [
        {
          "action.type": [
            "post_engagement"
          ],
          page: [
            "506841523177050"
          ],
        }
      ],
      adset_id: adsetId,
      status: "PAUSED"
    }
    return from(new Promise((resolve) => {
      FB.api(`/act_${this.accountId}/ads?fields=name,creative,tracking_specs,adset`, "post", ad, (response: any) => {
        resolve(response);
      });
    }));
  }
}

