// @flow
import Twit from 'twit';

import { api } from '../../config.json';

const T = new Twit({ ...api.twitter });

export const createStream = (path: string) => T.stream(path);

export const createStream2 = (path: string, params: *) => T.stream(path, params);

export const methods = {
  POST: (path: string, params: *) => T.post(path, params),
  GET: (path: string, params: *) => T.get(path, params)
};
