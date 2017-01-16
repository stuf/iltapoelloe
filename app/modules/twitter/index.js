// @flow
import React from 'karet';
import cx from 'classnames';
import * as L from 'partial.lenses';
import * as U from 'karet.util';
import Atom from 'kefir.atom';

import TitleBar from './components/title-bar';
import Statuses from './components/statuses';
import Status from './components/status';
import Compose from './components/compose';

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
    const compose = U.view(['compose'], state);
    return (
      <section className={cx(s.view, 'twitter-view')}>
        <TitleBar className={cx(s.titleBar)} />
        <Compose className={cx(s.compose)} compose={compose} />
        <Statuses className={cx(s.timeline)} statuses={statuses} Status={Status} count={150} />
      </section>
    );
  }
}
