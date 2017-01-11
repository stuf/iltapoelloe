// @flow
import React from 'karet';
import * as U from 'karet.util';

export default ({ statuses, Status }: *) =>
  <ul className="list-group">
    {U.seq(statuses, U.indices, U.mapCached(i =>
      <Status key={i} status={U.view(i, statuses)} />))}
  </ul>;
