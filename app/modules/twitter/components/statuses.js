/**
 * @fileoverview
 *  Represents a component for a list of statuses.
 *
 * @flow
 */
import React from 'karet';
import * as U from 'karet.util';
import cx from 'classnames';

import css from './statuses.css';

/** @todo Fix my unknown type */
export default ({ statuses, count = 20, Status }: *) =>
  <section className={cx(css.main)}>
    {U.seq(statuses,
           U.indices,
           U.reverse,
           U.take(count),
           U.mapCached(i => <Status key={i} status={U.view(i, statuses)} />)
           )}
  </section>;
