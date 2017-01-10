/**
 * @flow
 */
import { createSelector } from 'reselect';
import type { AppState } from '../types/app';

export const getStatuses = (state: AppState) => state.twitter.tweets;

export const getStatusList = createSelector(
  [getStatuses],
  (statuses) => statuses
);
