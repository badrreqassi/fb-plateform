import AuthResponse = facebook.AuthResponse;
import {Campaign} from "./campaign";
import {AdAccount} from "./adAccount";

export interface FacebookUser {
  id: number;
  name: string;
  authResponse: AuthResponse;
  accessToken: string;
  pages: unknown[];
  businessManagers: unknown[];
  adAccounts: AdAccount[];
  campaigns: Campaign[];

}
