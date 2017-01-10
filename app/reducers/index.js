// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import twitter from './twitter';
import tweet from './tweet';

const rootReducer = combineReducers({
  routing,
  twitter,
  tweet,
});

export default rootReducer;
