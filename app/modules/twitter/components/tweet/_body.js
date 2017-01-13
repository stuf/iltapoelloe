/**
 * @flow
 */
import React from 'karet';
import K, * as U from 'karet.util';
import * as L from 'partial.lenses';
import cx from 'classnames';
import moment from 'moment';
import stringReplace from 'react-string-replace';

const datetime = (timestamp: *): string =>
  moment(timestamp).fromNow();

const EntityLink = ({ entity, i }: { entity: *, i: number }): * =>
  <a key={i} href={U.view('expanded_url', entity)}>
    {U.view('display_url', entity)}
  </a>;

const StatusBody = ({ text }: { text: string }): * =>
  <p dangerouslySetInnerHTML={{ __html: text }} />;

export default ({
  text,
  timestamp,
  stats,
  entities,
  urls = U.view(['urls', L.define([])], entities)
}: *) =>
  <div className={cx('col-xs')}>
    {K(text, urls, (pt, us) =>
      <StatusBody
        text={U.seq(
          us,
          U.reduce((ptx, tcoUrl) =>
            U.replace(
              U.view('url', tcoUrl),
              U.view('expanded_url', tcoUrl),
              ptx
          ), pt)
        )}
      />)}
    <footer className={cx('row')}>
      <div className="col-xs-4">
        <div className="btn-toolbar">
          <div className="btn-group btn-group-sm">
            <button className="btn btn-primary">Retweet</button>
            <button className="btn btn-success">Favorite</button>
          </div>
          <div className="btn-group btn-group-sm">
            <button className="btn btn-secondary">Reply</button>
            <button className="btn btn-secondary">Quote</button>
          </div>
        </div>
      </div>
      <div className="col-xs">
        Retweets: {stats.view('retweets')} /
        Favorites: {stats.view('favorites')}
      </div>
      <div className="col-xs-4">
        {datetime(timestamp)}
      </div>
    </footer>
  </div>;
