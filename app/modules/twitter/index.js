// @flow
import React from 'karet';
import cx from 'classnames';
import * as L from 'partial.lenses';
import * as U from 'karet.util';

import Statuses from './components/statuses';
import Status from './components/status';

import css from './styles.css';

const statusesIn = U.view(['statuses', L.define([])]);

export default ({
  state,
  statuses = statusesIn(state)
}: *) =>
  <section className={cx(css.view)}>
    <header className={cx(css.titleBar)}>
      <h1>Iltapöllö</h1>
    </header>
    <article className={cx(css.timeline)}>
      <Statuses statuses={statuses} Status={Status} />
    </article>
  </section>;
