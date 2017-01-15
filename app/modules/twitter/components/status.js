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
import css from './status.scss';
import { Tweet, Retweet, QuotedTweet } from './tweet/index';

const retweetIn = U.view('retweeted_status');
const isQuoteIn = U.view('is_quote_status');

export default ({
  status,
  isRetweet = retweetIn(status),
  isQuote = isQuoteIn(status),
  classNames = cx(css.status, { [css.status]: isRetweet, [css.status]: isQuote })
}: *) =>
  <article className={classNames}>
    {K(retweetIn(status), isQuoteIn(status), (retweetedStatus, isQuoteFlag) => {
      let StatusComponent;
      let className;

      if (isQuoteFlag) {
        StatusComponent = QuotedTweet;
        className = css.isQuote;
      }
      else if (retweetedStatus) {
        StatusComponent = Retweet;
        className = css.isRetweet;
      }
      else {
        StatusComponent = Tweet;
      }

      return <StatusComponent status={status} className={cx(className)} />;
    })}
  </article>;

// export default ({ status }: *) =>
//   <article className={cx(css.status)}>
//     <p className={cx(css.text)}>{textIn(status)}</p>
//     <footer className={cx(css.footer)}>
//       <span className={cx(css.username)}>
//         {usernameIn(status)}
//       </span>
//       <time dateTime={timestampIn(status)} className={cx(css.timestamp)}>{timestampIn(status)}</time>

//       <div className={cx('btn-group', 'btn-group-sm')} style={{ float: 'right' }}>
//         <button className={cx('btn', 'btn-primary', p.isRetweeted(status) ? 'btn-active' : null)}>Retweet</button>
//         <button className={cx('btn', 'btn-success', p.isFavorited(status) ? 'btn-active' : null)}>Favorite</button>
//       </div>
//     </footer>
//   </article>;
