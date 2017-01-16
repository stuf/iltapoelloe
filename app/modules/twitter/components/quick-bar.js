// @flow
import React from 'karet';
import cx from 'classnames';

// $FlowFixMe
import s from './quick-bar.scss';

export default ({ ...props }: *) =>
  <nav className={cx(s.quickBar)}>
    <div className={cx('btn-group', 'btn-group-sm', s.buttons)}>
      <button className="btn btn-success"><i className="fa fa-info" /></button>
      <button className="btn btn-primary"><i className="fa fa-cog" /></button>
    </div>
  </nav>;
