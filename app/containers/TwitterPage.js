/**
 * @fileoverview
 *  Represents the root view of the main Twitter view.
 *
 * @flow
 * @todo Unify `Observer` types to match across usage.
 */
import React, { fromClass, Component } from 'karet';
import Atom from 'kefir.atom';
import Stored from 'atom.storage';
import * as L from 'partial.lenses';
import { curryN, compose } from 'ramda';

import { getStreams } from '../api/twit';
import Twitter from '../modules/twitter/index';
import mockData from './TwitterPage.json';

type Tuple<A, B> = [A, B];

type Lenses = {
  event: *,
  status: *
};

type ObserverValueFn = (value: *) => void;
type ObserverErrorFn = (error: string | Error) => void;
type ObserverEndFn = () => void;

type Observer = {
  value?: ObserverValueFn,
  error?: ObserverErrorFn,
  end?: ObserverEndFn
};

type ObserverTuple = Tuple<string, Observer>;

type EventType = 'status' | 'event';

// Utilities

/**
 * Handy logging with curry!
 */
const logInfoFn: (...args: *) => * =
  curryN(2, (info: string, ...args: *): void => console.info(`INFO: ${info}`, ...args));

/**
 * Twitter's state atom
 * @todo Fix my unknown type
 */
const state: * = Atom({
  statuses: [].concat(mockData),
  flags: {
    isStreaming: false
  }
});

/**
 * Define a `Stored Atom` for picking up events that aren't being
 * handled properly yet.
 * @todo Fix my unknown type
 */
const events: * = Stored({
  key: 'iltapoelloe:stored-events',
  value: [],
  Atom,
  storage: localStorage
});

/**
 * Specify lenses that we use to access state and its relatives.
 */
const lenses: Lenses = {
  status: state.view('statuses'),
  event: events.view()
};

const appendItemFn = (type: EventType = 'status', log: string, event: *): void => {
  logInfoFn(log, event);
  lenses[type].modify(items => L.set(L.append, event, items));
};

const appendItem = curryN(3, appendItemFn);

const createObserver = (value, error, end): Observer =>
  ({ value, error, end });

const newObserver: (...args: *) =>
  Observer = compose(createObserver, appendItem);

/**
 * List of tuples containing the event type to be subscribed to,
 * and the appropriate handler for said event.
 */
const streamEvents: Array<ObserverTuple> = [
  ['connect', logInfoFn('Connect')],
  ['connected', logInfoFn('Connected')],
  ['disconnect', logInfoFn('Disconnect')],
  ['delete', newObserver('event', 'Deleted status')],
  ['reconnect', newObserver('event', 'Reconnected')],
  ['warning', newObserver('event', 'Received warning')],
  ['limit', newObserver('event', 'Limit message')],
  ['unknown_user_event', newObserver('event', 'Unknown user event')],
  ['error', newObserver('event', 'Error')],
  ['tweet', newObserver('status', 'Received tweet')]
];

export const streamMap = getStreams('user', streamEvents);

export class TwitterPage extends React.Component {
  constructor(...args: any) {
    console.log('TwitterPage:', ...args);
    super(...args);
  }

  render() {
    return <Twitter {...{ state }} />;
  }
}

export default TwitterPage;
