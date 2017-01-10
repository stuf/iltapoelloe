/**
 *
 */
import * as L from 'partial.lenses';

export const originalTweetIn = ['originalTweet', L.required({})];

export const retweetedStatusIn = [originalTweetIn, 'retweeted_status'];

export const getStatusIn = lens => [lens, L.required({})];

export const getStatusUserIn = statusLens => [statusLens, 'user', L.required({})];
