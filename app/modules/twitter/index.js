// @flow
import React from 'karet';
import cx from 'classnames';
import * as L from 'partial.lenses';
import * as U from 'karet.util';

import Statuses from './components/statuses';
import Status from './components/status';

import css from './styles.css';

export default ({ state, statuses = U.view(['statuses', L.define([])], state) }: *) =>
  <section className={cx(css.view)}>
    <header className={cx(css.titleBar)}>
      <h1>Top keks</h1>
    </header>
    <article>
      <Statuses statuses={statuses} Status={Status} />
    </article>
  </section>;
