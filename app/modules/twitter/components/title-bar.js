/**
 * @flow
 */
import React from 'karet';
import cx from 'classnames';

export default ({ className, classNames = cx(className) }: *) =>
  <header className={classNames}>
    <h1>Iltapöllö</h1>
  </header>;
