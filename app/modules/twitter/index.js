// @flow
import React from 'karet';
import cx from 'classnames';
import * as L from 'partial.lenses';
import * as U from 'karet.util';
import { compose } from 'ramda';

import Statuses from './components/statuses';
import Status from './components/status';

// $FlowFixMe
import s from './styles.scss';

// $FlowFixMe
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
      <section className={cx(s.view, 'twitter-view')}>
        <header className={cx(s['title-bar'], 'twitter-titlebar')}>
          <h1>Iltapöllö</h1>
        </header>
        <article className={cx(s.timeline, 'twitter-timeline')}>
          <Statuses statuses={statuses} Status={Status} count={150} />
        </article>
      </section>
    );
  }
}
