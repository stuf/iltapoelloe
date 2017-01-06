import React from 'karet';
import * as L from 'partial.lenses';
import * as U from 'karet.util';
import cx from 'classnames';
import { PropTypes } from 'react';

import css from './tweet.css';

// Create some basic lenses and define some views over our incoming data
const userLens = L.compose(L.prop('user'), L.required({}));

const text = U.view(L.prop('text'));
const timestamp = U.view(L.prop('created_at'));
const userName = U.view(L.compose(userLens, L.prop('screen_name')));
const userIcon = U.view(L.compose(userLens, L.prop('profile_image_url_https')));

// Define some basic class names for elements
const tweetBodyClass = cx('row', css.tweet);
const userIconImageClass = cx('media-object', 'media-middle', 'rounded');

const Tweet = ({ tweet }) =>
  <div className={cx(css.tweetWrapper)}>
    <div className={tweetBodyClass}>
      <div className={cx(css.icon)}>
        <img src={userIcon(tweet)} className={userIconImageClass} role="presentation" />
      </div>
      <div className={cx(css.author)}>
        {userName(tweet)}
      </div>
      <div className={cx('col-xs', css.body)}>
        <div className={cx(css.bodyText)}>{text(tweet)}</div>
        <div className={cx(css.bodyMeta)}>{timestamp(tweet)}</div>
      </div>
    </div>
  </div>;

Tweet.propTypes = {
  tweet: PropTypes.object.isRequired
};

export default Tweet;
