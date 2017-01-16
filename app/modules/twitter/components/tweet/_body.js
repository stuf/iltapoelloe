/* eslint no-confusing-arrow: 0 */
/**
 * @fileoverview
 *  Provides a stateless component to display a tweet's text content,
 *  with support for quoted tweets.
 *
 * @flow
 */
import React from 'karet';
import K, * as U from 'karet.util';
import * as L from 'partial.lenses';
import cx from 'classnames';
import moment from 'moment';
import stringReplace from 'react-string-replace';

// $FlowFixMe
import s from './_body.scss';
import Images from './_images';
import { mapView } from '../../utils';

const getIdIn = i => U.view([i, 'id_str']);
const getIn = i => U.view(i);

const twitterFormat = 'ddd MMM DD HH:mm:ss ZZ YYYY';

const getTimestamp = str => moment(str, twitterFormat);

const textIn = U.view('text');
const timestampIn = U.view('created_at');
const mediaIn = U.view(['entities', 'media']);

/**
 * Provide a component to display the tweet's content, including possible embedded
 * entities.
 */
const StatusBody = ({ status, views = U.map(mapView(status)) }: *) =>
  K(views([textIn, timestampIn, mediaIn]),
    ([bodyText, time, media, t = getTimestamp(time)]) =>
      <div>
        <time className={cx(s['tweet-meta'])} dateTime={t.format()}>{t.fromNow()}</time>
        <p className={cx(s['status-body-text'])}>{bodyText}</p>

        {U.when(U.complement(U.isEmpty),
                U.always(<Images karet-lift images={media} />), media)}
      </div>);

/**
 * The main tweet's body component.
 */
export default ({ status }: *) =>
  <div className={cx('col-xs', s['status-body'])}>
    <StatusBody karet-lift status={status} />

    {/* Quoted tweet if present */}
    {K(U.view('quoted_status', status),
       U.view(['quoted_status', 'created_at'], status),
       (st, time) => U.not(U.isNil(st)) ?
         <article className={cx(s['quote-status-holder'])}>
           <header className={cx('row', s['quote-info'])}>
             <div className={cx('col-xs', s.username)}>@{U.view(['user', 'screen_name'], st)}</div>
             <time dateTime={getTimestamp(time).format()} className={cx('col-xs-4', s['quote-meta'])}>
               {getTimestamp(time).fromNow()}
             </time>
           </header>
           <StatusBody karet-lift status={st} />
         </article> : null)}
  </div>;
