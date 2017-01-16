// @flow
import * as U from 'karet.util';

export const dummy = 0;

export const mapView = U.curryN(2, (media, view) => view(media));
