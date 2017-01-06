import React from 'karet';
import { PropTypes } from 'react';
import cx from 'classnames';

import css from './timeline-view.css';
import Timeline from './timeline';

const TimelineView = ({ tweets, flags }) => {
  const { isStreaming } = flags;
  return (
    <div className={cx(css.timelineView)}>
      <Timeline {...{ tweets, isStreaming }} />
    </div>
  );
};

TimelineView.propTypes = {
  tweets: PropTypes.array.isRequired,
  flags: PropTypes.object.isRequired
};

export default TimelineView;
