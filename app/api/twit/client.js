// @flow
import Twit from 'twit';

import { api } from '../../config.json';

const T = new Twit({ ...api.twitter });

export const createStream = (path: string) => T.stream(path);

export const createStream2 = (path: string, params: *) => T.stream(path, params);

/**
 * @deprecated
 */
export default T;
