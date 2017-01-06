import React from 'karet';
import { PropTypes } from 'react';
import * as U from 'karet.util';
import cx from 'classnames';

import Tweet from './tweet';
import css from './timeline.css';

const Timeline = ({ tweets, isStreaming }) =>
  <div className={cx(css.timeline)}>
    <div className={cx('h5', css.timelineStatus)}>Timeline streaming is active: {isStreaming ? 'yes' : 'no'}</div>
    <div className={cx(css.timelineList)}>
      {U.seq(tweets, U.indices, U.mapCached(i =>
        <Tweet key={i} tweet={U.view(i, tweets)} />))}
    </div>
  </div>;

Timeline.propTypes = {
  tweets: PropTypes.array.isRequired,
  isStreaming: PropTypes.bool.isRequired
};

export default Timeline;
