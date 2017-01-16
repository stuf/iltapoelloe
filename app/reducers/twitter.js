/**
 * @fileoverview
 *  Handle state related to the Twitter API
 *
 * @flow
 */
import { handleActions } from 'redux-actions';
import * as L from 'partial.lenses';
import * as R from 'ramda';
import type { TwitterState } from '../types/app';
import {
  START_STREAM,
  STOP_STREAM,
  CREATE_STREAM_SUCCESS,
  EMIT_TWEET
} from '../actions/twitter';

const initialState: TwitterState = {
  observables: {},
  streams: {},
  flags: {},
  tweets: []
};

const handler = handleActions({
  [CREATE_STREAM_SUCCESS]: (state, { payload }) => R.merge(state, payload),
  [START_STREAM]: (state, { payload }) => R.merge(state, payload),
  [STOP_STREAM]: (state, { payload }) => R.merge(state, payload),
  [EMIT_TWEET]: (state, { payload }) => L.set(['tweets', L.append], payload.tweet, state)
}, initialState);

export default handler;
