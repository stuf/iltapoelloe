// @flow
import Twit from 'twit';
import { api } from '../config.json';

const T = new Twit({ ...api.twitter });

export default T;
