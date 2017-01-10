/**
 * @flow
 */
import React from 'karet';
import cx from 'classnames';

import css from './timeline-view.css';
import Timeline from './timeline';
import { getStatuses } from '../../selectors/twitter';

type TimelineViewProps = {
  isStreaming: boolean
};

const TimelineView = ({ isStreaming }: TimelineViewProps) =>
  <div className={cx(css.timelineView)}>
    <Timeline isStreaming={isStreaming} selector={getStatuses} />
  </div>;

export default TimelineView;
