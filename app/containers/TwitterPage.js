// @flow
import React from 'karet';
import Atom, { Molecule } from 'kefir.atom';
import * as L from 'partial.lenses';

import { getStreams } from '../api/twit';
import Twitter from '../modules/twitter/index';

const state = Atom({
  statuses: [],
  flags: {
    isStreaming: false
  }
});

const lenses = {
  statuses: state.view('statuses')
};

const logInfoFn = info => (...args) => console.info(`INFO: ${info}`, ...args);

const logInfo = str => ({ value: logInfoFn(str) });

const streamEvents = [
  ['message', logInfoFn('Message')],
  ['connect', logInfoFn('Connect')],
  ['connected', logInfoFn('Connected')],
  ['reconnect', logInfoFn('Reconnect')],
  ['unknown_user_event', logInfo('Unknown user event')],
  ['tweet', {
    value: value =>
      lenses.statuses.modify(curStatuses => L.set(L.append, value, curStatuses))
  }]
];

const props = { state };

export const streamMap = getStreams('user', streamEvents);

export default () =>
  <Twitter {...props} />;
