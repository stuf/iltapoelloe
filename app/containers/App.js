// @flow
import React from 'karet';
import cx from 'classnames';

const { Component } = React;

import css from './App.css';

type Props = {
  children: HTMLElement
};

export default class App extends Component {
  props: Props;

  render() {
    return (
      <section className={cx(css.app)}>
        {this.props.children}
      </section>
    );
  }
}
