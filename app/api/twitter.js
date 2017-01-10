// @flow
import Twit from 'twit';
import { api } from '../config.json';

type ApiClientAuthTokens = {
  accessToken: string,
  accessTokenSecret: string
};

type ApiClientOptions = {
  timeout: number
};

const T = new Twit({ ...api.twitter });

let client;

const defaultOptions = {
  timeout: 60 * 1000
};

class ApiClient {
  client: Twit;
  clientKey: string;
  clientSecret: string;
  accessToken: string;
  accessTokenSecret: string;

  constructor(authTokens: ApiClientAuthTokens, options?: ApiClientOptions = defaultOptions) {
    this.accessToken = authTokens.accessToken;
    this.accessTokenSecret = authTokens.accessTokenSecret;

    this.client = new Twit({
      client_key: this.clientKey,
      client_secret: this.clientSecret,
      access_token: this.accessToken,
      access_token_secret: this.accessTokenSecret,
      timeout_ms: options.timeout
    });
  }

  getStream(path: string) {
    return this.client.stream(path);
  }
}

export const createClient = () => {
  // client = new ApiClient({ accessToken: api.twitter.access_token, accessTokenSecret: api.twitter.access_token_secret });
};

export const getStream = (path: string) => client.getStream(path);

export { T };
