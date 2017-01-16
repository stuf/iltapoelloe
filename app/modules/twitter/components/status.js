/* eslint no-confusing-arrow: 0 */
/**
 * @fileoverview
 *  Represents the root component for displaying a tweet, which will delegate
 *  presentation to the appropriate component, depending on the type of tweet.
 *
 * @flow
 */
import React from 'karet';
import * as R from 'ramda';
import * as L from 'partial.lenses';
import K, * as U from 'karet.util';
import cx from 'classnames';

// $FlowFixMe
import s from './status.scss';
import { Tweet, Retweet, QuotedTweet } from './tweet/index';

const retweetIn = U.view('retweeted_status');
const isQuoteIn = U.view('is_quote_status');

export default ({
  status,
  isRetweet = retweetIn(status),
  isQuote = isQuoteIn(status),
  classNames = cx(s.status, { [s.status]: isRetweet, [s.status]: isQuote })
}: *) =>
  <article className={classNames}>
    {K(retweetIn(status), isQuoteIn(status), (retweetedStatus, isQuoteFlag) => {
      let StatusComponent;
      let className;

      if (isQuoteFlag) {
        StatusComponent = QuotedTweet;
        className = s.isQuote;
      }
      else if (retweetedStatus) {
        StatusComponent = Retweet;
        className = s.isRetweet;
      }
      else {
        StatusComponent = Tweet;
      }

      return <StatusComponent status={status} className={cx(className)} />;
    })}
  </article>;
