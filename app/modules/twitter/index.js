// @flow
import React, { fromClass, Component } from 'karet';
import cx from 'classnames';
import * as L from 'partial.lenses';
import * as U from 'karet.util';
import { compose } from 'ramda';

import Statuses from './components/statuses';
import Status from './components/status';

import css from './styles.css';

export default class Twitter extends React.Component {
  constructor(props: *) {
    super(props);
    this.props = props;
  }

  props: *;

  render() {
    const { state } = this.props;
    const statuses = U.view(['statuses', L.define([])], state);
    return (
      <section className={cx(css.view, 'twitter-view')}>
        <header className={cx(css.titleBar, 'twitter-titlebar')}>
          <h1>Iltapöllö</h1>
        </header>
        <article className={cx(css.timeline, 'twitter-timeline')}>
          <Statuses statuses={statuses} Status={Status} count={150} />
        </article>
      </section>
    );
  }
}
