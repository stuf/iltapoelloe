// @flow
import React from 'karet';
import * as R from 'ramda';
import * as L from 'partial.lenses';
import K, * as U from 'karet.util';

import Tweet from './tweet';

export default ({ status }: *) =>
  <li className="list-group-item">
    {K(status, s => <Tweet status={s} />)}
  </li>;
