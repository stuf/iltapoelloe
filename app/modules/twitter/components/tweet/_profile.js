/* eslint no-confusing-arrow: 0 */
// @flow
import React from 'karet';
import K, * as U from 'karet.util';
import cx from 'classnames';

// $FlowFixMe
import css from './_profile.scss';

const profileImageUrlIn = U.view('profile_image_url_https');
const usernameIn = U.view('screen_name');

export default ({ user, rtUser, isExpanded = false }: *) =>
  <div className={cx('col-xs-1', { [css['is-retweet']]: rtUser })}>
    <div className={cx(css['main-profile'])}>
      <img src={profileImageUrlIn(user)} alt={usernameIn(user)} className={cx(css['profile-image'])} />
    </div>
  </div>;
