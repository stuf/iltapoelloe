/* eslint no-confusing-arrow: 0 */
// @flow
import React from 'karet';
import K, * as U from 'karet.util';
import cx from 'classnames';

import css from './_profile.css';

const profileImageUrlIn = U.view('profile_image_url_https');
const usernameIn = U.view('screen_name');

export default ({
  user,
  rtUser
}: *) =>
  <div className={cx('col-xs-1', { [css.isRetweet]: rtUser })}>
    <img
      className={cx('rounded')}
      src={profileImageUrlIn(user)}
      alt={usernameIn(user)}
    />
    {rtUser ?
      <img
        className={cx('rounded', css.retweetingProfileImage)}
        src={profileImageUrlIn(rtUser)}
        alt={usernameIn(rtUser)}
      /> :
      ''}
  </div>;
