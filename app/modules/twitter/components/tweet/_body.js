/**
 * @flow
 */
import React from 'karet';
import K, * as U from 'karet.util';
import * as L from 'partial.lenses';
import cx from 'classnames';
import moment from 'moment';
import stringReplace from 'react-string-replace';

import css from './_body.css';

import Image from './_image';

const datetime = timestamp =>
  moment(timestamp).fromNow();

const EntityLink = ({ entity, i }: { entity: *, i: number }): * =>
  <a key={i} href={U.view('expanded_url', entity)}>
    {U.view('display_url', entity)}
  </a>;

const StatusBody = ({ text }: { text: string }) =>
  <p className={cx(css['status-body-text'])} dangerouslySetInnerHTML={{ __html: text }} />;

const urlsIn = U.view(['urls', L.define([])]);
const mediaIn = U.view(['media', L.define([])]);

const getIdIn = i => U.view([i, 'id_str']);
const getIn = i => U.view(i);

export default ({ text, timestamp, stats, entities, urls = urlsIn(entities), images = mediaIn(entities) }: *) =>
  <div className={cx('col-xs', css['status-body'])}>
    {K(text, urls, (pt, us) =>
      <StatusBody
        text={U.seq(us,
                    U.reduce((ptx, tcoUrl) =>
                             U.replace(U.view('url', tcoUrl),
                                       U.view('expanded_url', tcoUrl), ptx), pt))}
      />)}
    <div>
      {U.seq(images,
             U.indices,
             U.mapCached(i =>
               <Image key={getIdIn(i, images)} media={getIn(i, images)} />))}
    </div>
  </div>;
