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

const Timestamp = ({ time, visible = true }: *) =>
  !visible ? null
  : <time className={cx(s.meta)} dateTime={time.format()}>{time.fromNow()}</time>;

/**
 * Provide a component to display the tweet's content, including possible embedded
 * entities.
 */
const StatusBody = ({ status, timestamp = true, views = U.map(mapView(status)) }: *) =>
  K(views([textIn, timestampIn, mediaIn]),
    ([bodyText, time, media, t = getTimestamp(time)]) =>
      <div>
        <Timestamp karet-lift visible={timestamp} time={t} />
        <p className={cx(s['status-body-text'])}>{bodyText}</p>

        {U.when(U.complement(U.isEmpty),
                U.always(<Images karet-lift images={media} />), media)}
      </div>);

/**
 * The main tweet's body component.
 */
export default ({ status }: *) =>
  <div className={cx('col-xs', s.statusBody)}>
    <StatusBody karet-lift status={status} />

    {/* Quoted tweet if present */}
    {K(U.view('quoted_status', status),
       U.view(['quoted_status', 'created_at'], status),
       (st, time) => U.not(U.isNil(st)) ?
         <article className={cx(s.quoteStatusBody)}>
           <header className={cx(s.quoteInfo)}>
             <Timestamp karet-lift time={getTimestamp(time)} />
             <div className={cx(s.username)}>@{U.view(['user', 'screen_name'], st)}</div>
           </header>
           <StatusBody karet-lift status={st} timestamp={false} />
         </article> : null)}
  </div>;
