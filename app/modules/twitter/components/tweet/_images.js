/* eslint no-confusing-arrow: 0 */
/**
 * @flow
 */
import React from 'karet';
import K, * as U from 'karet.util';
import * as L from 'partial.lenses';
import * as R from 'ramda';
import cx from 'classnames';

// $FlowFixMe
import s from './_images.scss';
import Image from './_image';

export default ({ images }: *) =>
  <div className={cx(s.images, { [s['no-images']]: U.isNil(images) })}>
    {U.seq(images,
           U.indices,
           U.mapCached(i =>
             <Image karet-lift key={i} media={U.view(i, images)} />))}
  </div>;
