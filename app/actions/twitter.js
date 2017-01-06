// @flow
import Rx from 'rxjs/Rx';
import * as L from 'partial.lenses';
import * as R from 'ramda';
import T from '../api/twitter';

export const START_STREAM: string = 'twitter/START_STREAM';
export const STOP_STREAM: string = 'twitter/STOP_STREAM';
export const DISPOSE_STREAM: string = 'twitter/DISPOSE_STREAM';
export const DISPOSE_STREAM_COMPLETE: string = 'twitter/DISPOSE_STREAM_COMPLETE';
export const CREATE_STREAM: string = 'twitter/CREATE_STREAM';
export const CREATE_STREAM_COMPLETE: string = 'twitter/CREATE_STREAM_COMPLETE';
export const EMIT_TWEET: string = 'twitter/EMIT_TWEET';

const tweetLens = L.compose(
  L.defaults({}),
  L.prop('tweets')
);

const Tweets = {
  list: [L.defaults({}), 'tweets'],
  stream$: 'stream$',
  fromPayload: [L.defaults({}), 'tweets'],
  listIn: order => L.compose(
    L.defaults([]),
    L.normalize(
      R.compose(
        R.multiply(order === -1 ? -1 : 1),
        R.prop('id_str')
      )
    )
  )
};

const flagLensFor = (...args) => ['flags', L.required({}), ...args];
const Flags = {
  isStreaming: flagLensFor('isStreaming')
};

const streamLensFor = (...args) => ['streams', L.required({}), ...args];
const Stream = {
  tweetStream$: streamLensFor('tweetStream$')
};

export const startStream = () =>
  (dispatch: *, getState: *) => {
    const state = getState();
    state.stream.start();
    dispatch({
      type: START_STREAM,
      payload: {
        isStreaming: true
      }
    });
  };

export const stopStream = () =>
  (dispatch: *, getState: *) => {
    const state = getState();
    state.stream.stop();
    dispatch({
      type: STOP_STREAM,
      payload: {
        streaming: false
      }
    });
  };

/**
 * Create a stream for the user's Twitter timeline, with exposing
 * functionality for controlling the stream.
 */
export const createStream = () =>
  (dispatch: *, getState: *) => {
    dispatch({
      type: CREATE_STREAM
    });

    const state = getState();

    // If we already have a stream, just short-circuit instead. We don't want a new one.
    if (L.get(Flags.isStreaming, state)) {
      return;
    }

    const observableEventStream = (stream, event = 'tweet') =>
      Rx.Observable.fromEvent(stream, event);

    const isStreaming = true;
    const tweetStream = T.stream('user');
    const tweetStream$ = observableEventStream(tweetStream);

    tweetStream$.subscribe((tweet) => dispatch({ type: EMIT_TWEET, payload: { tweet } }));

    // Define an observable that can be used to stop the current stream
    const shouldStopStream$ = Rx.Observable.create((observer) => {
      observer.next({ stopStreaming: true });
      observer.complete();
    });

    shouldStopStream$.subscribe(({ stopStreaming }) => {
      if (stopStreaming) {
        tweetStream.stop();
      }
    });

    dispatch({
      type: CREATE_STREAM_COMPLETE,
      payload: {
        observables: { shouldStopStream$ },
        streams: { tweetStream, tweetStream$ },
        flags: { isStreaming }
      }
    });
  };

export const disposeStream = () =>
  (dispatch: *, getState: *) => {
    dispatch({
      type: DISPOSE_STREAM
    });

    const state = getState();
    const streamToDispose = L.get(Stream.tweetStream$, state);

    if (streamToDispose) {
      streamToDispose.unsubscribe();
    }

    dispatch({
      type: DISPOSE_STREAM_COMPLETE
    });
  };
