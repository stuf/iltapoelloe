/**
 * @fileoverview
 *  Represents a view of a status
 *
 * @flow
 */
import React from 'karet';
import K, * as U from 'karet.util';
import * as L from 'partial.lenses';
import cx from 'classnames';

import Body from './_body';
import Profile from './_profile';

const profileIn = U.view('user');
const textIn = U.view('text');
const timestampIn = U.view('timestamp_ms');
const entitiesIn = U.view(['entities']);
const statsIn = U.view(
  L.pick({
    retweets: 'retweet_count',
    favorites: 'favorite_count'
  })
);

export default ({ status }: *) =>
  <div className={cx('row')}>
    <Profile user={profileIn(status)} />
    <div className="col-xs-2">
      {U.view(['user', 'screen_name'], status)}
    </div>
    <Body
      text={textIn(status)}
      stats={statsIn(status)}
      entities={entitiesIn(status)}
      timestamp={timestampIn(status)}
    />
  </div>;
