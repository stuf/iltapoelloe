/* eslint no-confusing-arrow: 0 */
/**
 * @flow
 */
import React from 'karet';
import K, * as U from 'karet.util';
import * as L from 'partial.lenses';
import cx from 'classnames';
import moment from 'moment';
import stringReplace from 'react-string-replace';

// $FlowFixMe
import css from './_body.scss';
import Images from './_images';

const urlsIn = U.view(['urls', L.define([])]);
const mediaItemsIn = U.view(['entities', 'media', L.define([])]);

const getIdIn = i => U.view([i, 'id_str']);
const getIn = i => U.view(i);

/**
 *
 */

const StatusBody = ({ status }: *) =>
  <div>
    <p className={cx(css['status-body-text'])}>
      {U.view('text', status)}
    </p>

    {/* Images, if any */}
    {K(U.view(['entities', 'media'], status), mediaItems =>
      U.when(U.complement(U.isEmpty),
             U.always(<Images karet-lift images={mediaItems} />), mediaItems)
      )}
  </div>;

export default ({ status }: *) =>
  <div className={cx('col-xs', css['status-body'])}>
    <StatusBody karet-lift status={status} />

    {/* Quoted tweet if present */}
    {K(U.view('quoted_status', status), s =>
      U.not(U.isNil(s)) ?
        <div className={cx(css['quote-status-holder'])}>
          <div className={cx(css.username)}>@{U.view(['user', 'screen_name'], s)} {U.view('timestamp_ms', s)}</div>
          <StatusBody karet-lift status={s} />
        </div> :
        null)}
  </div>;
