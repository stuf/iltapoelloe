/**
 * @flow
 */
import React from 'karet';
import K, * as U from 'karet.util';
import * as L from 'partial.lenses';

const imageUrl = U.view('media_url_https');
const tcoUrl = U.view('url');
const type = U.view('type');

const mapView = media => view => view(media);

export default ({ media, views = U.map(mapView(media)) }: *) =>
  <div>
    {K(views([imageUrl, tcoUrl, type]),
      ([url, tco, t]) =>
        <div>{url}</div>)}
  </div>;
