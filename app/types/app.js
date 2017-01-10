/* eslint no-undef: 0 */
// @flow
export type AppState = {
  twitter: TwitterState
};

export type TwitterState = {
  /**
   * This is a herp
   */
  tweets: Array<*>
};
