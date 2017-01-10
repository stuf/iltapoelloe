// @flow
import React from 'karet';
import cx from 'classnames';

const Icon = ({ type }: *) =>
  <i className={cx('fa', `fa-${type}`)} />;

export default Icon;
