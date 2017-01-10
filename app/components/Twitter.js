/**
 * @flow
 */
import React from 'karet';
import * as R from 'ramda';
import * as L from 'partial.lenses';
import * as U from 'karet.util';
import Atom from 'kefir.atom';
import cx from 'classnames';

import css from './Twitter.css';

import { DangerButton, PrimaryButton, SecondaryButton } from './ui/button';
import { TimelineView, Post } from './twitter/index';

// Create an atom to hold a new user post.
const newTweet = Atom({
  text: undefined,
  chars: undefined,
  selection: {}
});

type Actions = {
  twitter: *,
  tweet: *
};

type Props = {
  twitter: *,
  tweet: *,
  actions: Actions
};

// Just to make flow play nice with karet.
type Component = React.Component;

// $FlowFixMe
export default class Twitter extends Component {
  props: Props;

  render() {
    const { tweet, twitter, actions } = this.props;
    const list = twitter.tweets;
    const { isStreaming = false } = twitter.flags;

    return (
      <div className={cx(css.body)}>
        {/* Application title bar */}
        <div className={cx(css.titleBarWrap)}>
          <div className={cx(css.titleBar)}>
            Iltapöllö version Jorma
          </div>
        </div>

        <div className={cx(css.devToolbar, 'btn-toolbar')}>
          <div className={cx('btn-group')} style={{ display: 'none' }}>
            <SecondaryButton onClick={actions.twitter.startStream} disabled={isStreaming} size="sm" text="Start Stream" />
            <SecondaryButton onClick={actions.twitter.stopStream} disabled={!isStreaming} size="sm" text="Stop Stream" />
          </div>

          <div className={cx('btn-group')}>
            <PrimaryButton onClick={actions.twitter.createStream} disabled={isStreaming} size="sm" text="Create Stream" />
            <DangerButton onClick={actions.twitter.disposeStream} disabled={!isStreaming} size="sm" text="Dispose Stream" />
          </div>
        </div>

        {/* Compose new post -component */}
        <Post tweetAtom={newTweet} state={tweet} actions={{ postTweet: actions.twitter.postTweet }} />

        {/* The timeline view */}
        <TimelineView tweets={list} isStreaming={isStreaming} />
      </div>
    );
  }
}
