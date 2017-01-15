/**
 * @fileoverview
 *  Represents a view of a quoted status
 *
 * @flow
 */
import React from 'karet';
import * as U from 'karet.util';
import * as L from 'partial.lenses';
import cx from 'classnames';

import Body from './_body';
import Profile from './_profile';

export default
  ({ status, className, isExpanded = true, user = U.view('user', status) }: *) =>
    <div className={cx('row', className)}>
      <Profile user={user} isExpanded={isExpanded} />
      <div className="col-xs-2">
        {U.view('screen_name', user)}
      </div>
      <Body status={status} />
    </div>;
