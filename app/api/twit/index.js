/* eslint no-underscore-dangle: 0 */
// @flow
import Kefir from 'kefir';
import { compose, map, prepend, fromPairs } from 'ramda';
import { createStream } from './client';

/** Type declarations */
type Tuple<A, B> = [A, B];

type ValueFn = (value: *) => void;
type ErrorFn = (error: string | Error) => void;
type EndFn = () => void;

type ObserverObject = { value?: ValueFn, error?: ErrorFn, end?: EndFn };
type ObserverFn = (value?: ValueFn, error?: ErrorFn, end?: EndFn) => void;
type Observer = ObserverObject | ObserverFn;

/** Utility functions */

/** Exports */

/** Generic stream creators */
export const dummy = true;

export const getStreams = (path: string, events: Array<Tuple<string, Observer>>) => {
  const stream = createStream(path);
  const _createStreams = compose(
    fromPairs,
    map(([emitter, eventType, observer]) => [eventType, Kefir.fromEvents(emitter, eventType).observe(observer)]),
    map(prepend(stream))
  );

  const streams = _createStreams(events);
  return streams;
};