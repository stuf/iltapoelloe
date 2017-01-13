/**
 * @flow
 */
import { connect } from 'react-redux';
import React from 'karet';
import * as U from 'karet.util';
import cx from 'classnames';

import Tweet from './tweet';
import css from './timeline.css';

type TimelineProps = {
  statuses: *,
  isStreaming: boolean,
  selector: *
};

const mapStateToProps = (state, ownProps: TimelineProps) => ({
  statuses: ownProps.selector(state)
});

const Timeline = ({ statuses, isStreaming, selector }: TimelineProps) =>
  <div className={cx(css.timeline)}>
    <div className={cx('h5', css.timelineStatus)}>Timeline streaming is active: {isStreaming ? 'yes' : 'no'}</div>
    <div className={cx(css.timelineList)}>
      {U.seq(statuses, U.mapCached(i =>
        <Tweet key={i.originalStatus.id_str} tweet={U.view(i.originalStatus.id_str, statuses)} />))}
    </div>
  </div>;

export default connect(mapStateToProps)(Timeline);
