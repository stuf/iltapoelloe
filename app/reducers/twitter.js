// @flow

import {
  START_STREAM,
  STOP_STREAM,
  CREATE_STREAM,
  CREATE_STREAM_COMPLETE,
  DISPOSE_STREAM,
  DISPOSE_STREAM_COMPLETE,
  EMIT_TWEET
} from '../actions/twitter';

import createReducer from './create-reducer';

type State = *;
type Action = { type: string, payload: *, error: Error | string };
type ReducerFn = (state: State, action: Action) => State;

const initialState: State = {
  observables: {},
  streams: {},
  flags: {},
  tweets: []
};

const reducer = createReducer(initialState, {
  [CREATE_STREAM](state) {
    return { ...state };
  },
  [CREATE_STREAM_COMPLETE](state, { payload }) {
    return { ...state, ...payload };
  },
  [DISPOSE_STREAM](state) {
    return { ...state };
  },
  [DISPOSE_STREAM_COMPLETE](state) {
    return { ...state };
  },
  [START_STREAM](state, { payload }) {
    return {
      ...state,
      ...payload
    };
  },
  [STOP_STREAM](state, { payload }) {
    return {
      ...state,
      ...payload
    };
  },
  [EMIT_TWEET](state, { payload }) {
    return {
      ...state,
      tweets: state.tweets.concat(payload.tweet)
    };
  },
});

export default reducer;
