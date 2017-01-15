/**
 * @fileoverview
 *  Represents a view of a retweeted status
 *
 * @flow
 */
import React from 'karet';
import K, * as U from 'karet.util';
import * as L from 'partial.lenses';
import cx from 'classnames';

import Body from './_body';
import Profile from './_profile';

const statusBase = L.prop('retweeted_status');

const retweetingProfileIn = U.view('user');
const profileIn = U.view([statusBase, 'user']);
const textIn = U.view([statusBase, 'text']);
const timestampIn = U.view([statusBase, 'timestamp_ms']);
const entitiesIn = U.view([statusBase, 'entities']);
const statsIn = U.view([
  statusBase,
  L.pick({
    retweets: 'retweet_count',
    favorites: 'favorite_count'
  })
]);

export default ({ status, className, isExpanded = false }: *) =>
  <div className={cx('row', className)}>
    <Profile user={profileIn(status)} rtUser={retweetingProfileIn(status)} />
    <div className="col-xs-2">
      {U.view(['retweeted_status', 'user', 'screen_name'], status)}
    </div>
    <Body status={U.view('retweeted_status', status)} />
  </div>;
