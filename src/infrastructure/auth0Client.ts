import { HTTPCache, RESTDataSource } from "apollo-datasource-rest";
import { Auth0Configuration } from "../config";

export interface Auth0UserInfo {
  user_id: string;
  name: string;
  given_name: string;
  family_name: string;
  nickname: string;
  email: string;
  picture: string;
  updated_at: Date;
  created_at: Date;
}

interface AuthToken {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
}

const buildUrl = (domain: string, endpoint: string = '') => `https://${domain}${endpoint}`;

export class Auth0Client extends RESTDataSource {

  constructor(private readonly auth0Configuration: Auth0Configuration) {
    super();

    this.baseURL = buildUrl(`${auth0Configuration.domain}`);
    this.httpCache = new HTTPCache()
  }

  private async getAccessToken(): Promise<AuthToken> {
    const body = {
      "grant_type": "client_credentials",
      "client_id": this.auth0Configuration.clientId,
      "client_secret": this.auth0Configuration.clientSecret,
      "audience": buildUrl(this.auth0Configuration.domain, '/api/v2/')
    };

    return this.post( "/oauth/token", body,{
      headers: {
          "content-type": "application/json",
        }
      }
    );
  }

  async getUserInfo(externalId: string): Promise<Auth0UserInfo> {
    const token = await this.getAccessToken();

    return this.get(
      `/api/v2/users/${externalId}`,
      undefined,
      {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
            "content-type": "application/json",
        },
      }).then(userInfo => userInfo as Auth0UserInfo);
  }
}