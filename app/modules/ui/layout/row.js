// @flow
import React from 'karet';
import cx from 'classnames';

export default ({ children, ...props }: *) =>
  <div className={cx('row')} {...props}>
    {children}
  </div>;
