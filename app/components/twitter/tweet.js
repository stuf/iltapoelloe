/**
 * @flow
 */
import React from 'karet';
import * as L from 'partial.lenses';
import * as R from 'ramda';
import K, * as U from 'karet.util';
import cx from 'classnames';
import { SecondaryButton } from '../ui/button';

import css from './tweet.css';

// Create some basic lenses and define some views over our incoming data
const originalStatusIn = ['originalStatus', L.required({})];
const userLens = ['user', L.required({})];

const statusIn = ['status', L.required({})];

const text = U.view([statusIn, 'text']);
const timestamp = U.view([originalStatusIn, 'created_at']);
const userName = U.view([statusIn, userLens, 'screen_name']);
const userIcon = U.view([statusIn, userLens, 'profile_image_url_https']);

const UserIcon = ({ profileImageUrl, username }: *) =>
  <div>
    <img
      src={profileImageUrl}
      className={cx('media-object', 'media-middle', 'rounded')}
      role="presentation"
      alt={username}
    />
  </div>;

const Tweet = ({ tweet }: *) =>
  <div className={cx(css.tweetWrapper)}>
    <div className={cx(css.tweet, 'row')}>
      <div className={cx(css.icon)}>
        <UserIcon profileImageUrl={userIcon(tweet)} username={userName(tweet)} />
      </div>
      <div className={cx(css.author)}>
        <div>{userName(tweet)}</div>
      </div>
      <div className={cx('col-xs', css.body)}>
        <div className={cx(css.bodyText)}>{text(tweet)}</div>
        <div className={cx(css.bodyMeta)}>{timestamp(tweet)}</div>
        <div className={cx('btn-toolbar')} style={{ marginTop: '10px' }}>
          <div className={cx('btn-group')}>
            <SecondaryButton text="Retweet" icon="retweet" size="sm" />
            <SecondaryButton text="Like" icon="heart" size="sm" />
          </div>
        </div>
      </div>
    </div>
  </div>;

export default Tweet;
