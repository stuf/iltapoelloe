/**
 * @fileoverview
 *  Handle state changes for current user posts in progress
 */
import { handleActions } from 'redux-actions';
import * as L from 'partial.lenses';
import * as Tweet from '../actions/tweet';

// Define some root lenses to compose on
const inFlags = L.compose(L.prop('flags'), L.required({}));

// Define some lenses that we can use for modifying state
const isPostingTweet = L.compose(inFlags, L.prop('isPosting'), L.required(false));

const initialState = {
  flags: {
    isPosting: false,
    isFailed: false
  }
};

const handler = handleActions({
  [Tweet.POST_TWEET]: (state) => ({ ...state }),
  [Tweet.POST_TWEET_START]: (state) => L.set(isPostingTweet, true, state),
  [Tweet.POST_TWEET_SUCCESS]: (state) => L.remove(isPostingTweet, false, state),
}, initialState);

export default handler;
