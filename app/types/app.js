/* eslint no-undef: 0 */
// @flow
export type TwitterState = {
  observables: { [key: string]: * },
  streams: { [key: string]: * },
  flags: { [key: string]: * },
  tweets: Array<*>
};

export type AppState = {
  twitter: TwitterState
};
