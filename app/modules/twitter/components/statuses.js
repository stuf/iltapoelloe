/**
 * @fileoverview
 *  Represents a component for a list of statuses.
 *
 * @flow
 */
import React from 'karet';
import * as U from 'karet.util';
import cx from 'classnames';

// $FlowFixMe
import css from './statuses.scss';

/** @todo Fix my unknown type */
export default ({ statuses, count = 20, Status, className, classNames = cx(className) }: *) =>
  <article className={classNames}>
    <section className={cx(css.main)}>
      {U.seq(statuses,
            U.indices,
            U.reverse,
            U.take(count),
            U.mapCached(i => <Status key={i} status={U.view(i, statuses)} />)
            )}
    </section>
  </article>;
