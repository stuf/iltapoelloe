/**
 * @flow
 */
import React from 'karet';
import cx from 'classnames';

import QuickBar from './quick-bar';

export default ({ className, classNames = cx(className) }: *) =>
  <header className={classNames}>
    <QuickBar />
    <h1>Iltapöllö</h1>
  </header>;
