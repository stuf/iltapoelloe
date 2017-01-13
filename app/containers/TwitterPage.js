// @flow
import React from 'karet';
import Atom, { Molecule } from 'kefir.atom';
import * as L from 'partial.lenses';

import { getStreams } from '../api/twit';
import Twitter from '../modules/twitter/index';
import mockData from './TwitterPage.json';

/**
 * Utility
 */
const logInfoFn = info => (...args) => console.info(`INFO: ${info}`, ...args);

const logInfo = str => ({ value: logInfoFn(str) });

/**
 * Twitter's state atom
 */
const state = Atom({
  statuses: [].concat(mockData),
  flags: {
    isStreaming: false
  }
});

const lenses = {
  statuses: state.view('statuses')
};

/**
 * List of tuples containing the event type to be subscribed to,
 * and the appropriate handler for said event.
 */
const streamEvents = [
  ['message', logInfoFn('Message')],
  ['delete', logInfoFn('Delete')],
  ['connect', logInfoFn('Connect')],
  ['connected', logInfoFn('Connected')],
  ['disconnect', logInfoFn('Disconnect')],
  ['reconnect', logInfoFn('Reconnect')],
  ['warning', logInfoFn('Warning')],
  ['limit', logInfoFn('Limit message')],
  ['unknown_user_event', logInfoFn('Unknown user event')],
  ['error', logInfoFn('Error')],
  ['tweet', {
    value: status =>
      lenses.statuses.modify(statuses => L.set(L.append, status, statuses))
  }]
];

export const streamMap = getStreams('user', streamEvents);

export default () =>
  <Twitter {...{ state }} />;
