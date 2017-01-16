/**
 * @fileoverview
 *  Provides a stateless tweet compose form
 *
 * @flow
 */
import React from 'karet';
import K, * as U from 'karet.util';
import * as L from 'partial.lenses';
import { curry } from 'ramda';
import cx from 'classnames';

// $FlowFixMe
import s from './compose.scss';

// Lenses
const textIn = U.view(['text', L.define('')]);

// Event subscriptions
/**
 * `onChange` event handler.
 */
const onChange = curry((atom, e) => atom.modify(x => L.set('text', e.target.value, x)));

/**
 * Post tweet
 */
const postStatus = e => {
  console.log('postStatus', e);
  e.preventDefault();
};

export default ({ compose, className }: *) =>
  <section className={cx(className, s.compose)}>
    <form>
      <div className={cx('form-group', 'mb-0', s.composeBody)}>
        <textarea
          className={cx('form-control', '')}
          placeholder="Compose tweet"
          onChange={onChange(compose)}
        />
      </div>
      <footer className={cx('form-group', 'row', 'mb-0')}>
        <div className={cx('col-xs', s.counter)}>
          {K(textIn(compose), cs => <span className="tag tag-default">{cs.length} / 160</span>)}
        </div>
        <div className={cx('col-xs-1')}>
          <button className="btn btn-primary btn-sm" onClick={postStatus}>Post</button>
        </div>
      </footer>
    </form>
  </section>;
