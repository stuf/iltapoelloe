/**
 * @flow
 */
import React from 'karet';
import K, * as U from 'karet.util';
import * as L from 'partial.lenses';
import cx from 'classnames';

// $FlowFixMe
import s from './_image.scss';

const sImageHolder = s['image-holder'];
const sImage = s.image;

const imageUrl = U.view('media_url_https');
const tcoUrl = U.view('url');
const type = U.view('type');

const mapView = U.curryN(2, (media, view) => view(media));

export default ({ media, views = U.map(mapView(media)) }: *) =>
  <div className={cx(sImageHolder)}>
    {K(views([imageUrl, tcoUrl, type]),
      ([url, tco, t]) =>
        <div className={cx(sImage)} style={{ backgroundImage: `url(${url})` }} />)}
  </div>;
