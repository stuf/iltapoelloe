// @flow
import React from 'karet';
import cx from 'classnames';

export default ({ children, ...props }: *) =>
  <div className={cx('form-group')} {...props}>
    {children}
  </div>;
