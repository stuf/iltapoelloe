import { createAction } from 'redux-actions';
import Rx from 'rxjs/Rx';
import * as L from 'partial.lenses';
import * as R from 'ramda';
import { T } from '../api/twitter';
import {
  originalTweetIn,
  retweetedStatusIn,
  getStatusIn,
  getStatusUserIn
} from '../utils/lenses';

// Action constants
// ----------------
export const POST_TWEET = 'twitter/POST_TWEET';
export const POST_TWEET_START = 'twitter/POST_TWEET_START';
export const POST_TWEET_SUCCESS = 'twitter/POST_TWEET_SUCCESS';
export const POST_TWEET_FAILURE = 'twitter/POST_TWEET_FAILURE';

export const RETWEET_POST = 'twitter/RETWEET_POST';
export const RETWEET_POST_START = 'twitter/RETWEET_POST_START';
export const RETWEET_POST_SUCCESS = 'twitter/RETWEET_POST_SUCCESS';
export const RETWEET_POST_FAILURE = 'twitter/RETWEET_POST_FAILURE';

export const START_STREAM = 'twitter/START_STREAM';
export const STOP_STREAM = 'twitter/STOP_STREAM';

export const DISPOSE_STREAM = 'twitter/DISPOSE_STREAM';
export const DISPOSE_STREAM_COMPLETE = 'twitter/DISPOSE_STREAM_COMPLETE';

export const CREATE_STREAM = 'twitter/CREATE_STREAM';
export const CREATE_STREAM_START = 'twitter/CREATE_STREAM_START';
export const CREATE_STREAM_ERROR = 'twitter/CREATE_STREAM_ERROR';
export const CREATE_STREAM_SUCCESS = 'twitter/CREATE_STREAM_SUCCESS';
export const CREATE_STREAM_COMPLETE = 'twitter/CREATE_STREAM_COMPLETE';

export const EMIT_TWEET = 'twitter/EMIT_TWEET';
export const UPDATE_TWEET_MAP = 'twitter/UPDATE_TWEET_MAP';

const flagLensFor = (...args) => ['flags', L.required({}), ...args];
const Flags = {
  isStreaming: flagLensFor('isStreaming')
};

const streamLensFor = (...args) => ['streams', L.required({}), ...args];
const Stream = {
  tweetStream$: streamLensFor('tweetStream$')
};

// Actions
// -------

/**
 * Retweet actions
 */

export const retweetPostStart = createAction(RETWEET_POST_START);

export const retweetPostSuccess = createAction(RETWEET_POST_SUCCESS);

export const retweetPostFailure = createAction(RETWEET_POST_FAILURE);

export const retweetPost = (payload) =>
  (dispatch) => {
    dispatch(createAction(RETWEET_POST_START));

    T.post('statuses/retweet/:id', { id: payload.id }, (err, data, response) => {
      console.log('retweet response data: ', { err, data });
      if (err) {
        dispatch(retweetPostFailure());
        return;
      }
      dispatch(retweetPostSuccess());
    });
  };

/**
 * Twitter user actions
 */

export const postTweetStart = createAction(POST_TWEET_START);

export const postTweetSuccess = createAction(POST_TWEET_SUCCESS);

export const postTweetFailure = createAction(POST_TWEET_FAILURE);

export const postTweet = (payload) =>
  (dispatch) => {
    dispatch(postTweetStart());

    // @todo Replace me with an API handler call after this works.
    T.post('statuses/update', { status: payload.tweet }, (err, data, response) => {
      if (err) {
        dispatch(postTweetFailure(err));
        return;
      }

      dispatch(postTweetSuccess(response));
    });
  };

/**
 * Twitter streams
 * ---------------
 */

export const startStream = () =>
  (dispatch, getState) => {
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
  (dispatch, getState) => {
    const state = getState();
    state.stream.stop();
    dispatch({
      type: STOP_STREAM
    });
  };

export const createStreamStart = createAction(CREATE_STREAM_START, (dispatch, getState) => {
  console.log(CREATE_STREAM_START);
  console.log({ dispatch, getState });
});

export const createStreamSuccess = createAction(CREATE_STREAM_SUCCESS);

export const createStreamComplete = createAction(CREATE_STREAM_COMPLETE);

export const updateTweetMap = createAction(UPDATE_TWEET_MAP);

export const emitTweet = createAction(EMIT_TWEET);

/**
 * Create a stream for the user's Twitter timeline, with exposing
 * functionality for controlling the stream.
 *
 * @todo Double-check that stopping of stream works.
 */
export const createStream = () =>
  (dispatch, getState) => {
    dispatch({
      type: CREATE_STREAM
    });

    const state = getState();

    // If we already have a stream, just short-circuit instead. We don't want a new one.
    if (L.get(Flags.isStreaming, state)) {
      return;
    }

    const observableEventStream = R.curryN(2, (stream, event = 'tweet') =>
      Rx.Observable.fromEvent(stream, event));

    const isStreaming = true;
    const tweetStream = T.stream('user');
    const createEventStream = observableEventStream(tweetStream);

    // @todo Turn this motherfucker into a mean lensing function
    const tweetStream$ = createEventStream('tweet').subscribe((tweet) => {
      const isRetweet = 'retweeted_status' in tweet;
      const o = {
        flags: { isRetweet },
        status: isRetweet ? tweet.retweeted_status : tweet,
        originalStatus: tweet
      };

      dispatch(emitTweet({ tweet: o }));
    });

    createEventStream('connected')
      .subscribe((response) =>
        console.info('onConnected: ', { response }));

    createEventStream('reconnect')
      .subscribe((request, response, connectInterval) =>
        console.log('onReconnect:', { request, response, connectInterval }));

    createEventStream('limit')
      .subscribe((limitMessage) =>
        console.warn('onLimit: ', { limitMessage }));

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

    dispatch(createStreamSuccess({
      observables: { shouldStopStream$ },
      streams: { tweetStream, tweetStream$ },
      flags: { isStreaming }
    }));
  };

export const disposeStream = () =>
  (dispatch, getState) => {
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
