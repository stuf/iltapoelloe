// @flow

import { PropTypes, Component } from 'react';
import React from 'karet';
import * as R from 'ramda';
import * as L from 'partial.lenses';
import * as U from 'karet.util';
import Atom from 'kefir.atom';
import cx from 'classnames';

import css from './Twitter.css';

import { DangerButton, PrimaryButton, SecondaryButton } from './ui/button';
import TimelineView from './twitter/timeline-view';
import Post from './twitter/post';

const newTweet = Atom({ text: undefined, chars: undefined });

export default class Twitter extends Component {
  static propTypes = {
    twitter: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { twitter, actions } = this.props;
    const list = twitter.tweets;
    const { isStreaming } = twitter.flags;

    return (
      <div className={cx(css.body)}>
        <div className={cx('btn-toolbar', 'row')}>
          <div className={cx('btn-group')}>
            <SecondaryButton onClick={actions.startStream} disabled={isStreaming} text="Start Stream" />
            <SecondaryButton onClick={actions.stopStream} disabled={!isStreaming} text="Stop Stream" />
          </div>

          <div className={cx('btn-group')}>
            <PrimaryButton onClick={actions.createStream} disabled={isStreaming} text="Create Stream" />
            <DangerButton onClick={actions.disposeStream} disabled={!isStreaming} text="Dispose Stream" />
          </div>
        </div>

        <Post tweet={newTweet} />

        <TimelineView tweets={list} flags={twitter.flags} />
      </div>
    );
  }
}
