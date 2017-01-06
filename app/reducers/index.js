// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import twitter from './twitter';

const rootReducer = combineReducers({
  routing,
  twitter
});

export default rootReducer;
