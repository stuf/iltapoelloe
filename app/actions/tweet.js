/**
 * @fileoverview
 *  Handle actions related to the user making a new post
 */
import { createAction } from 'redux-actions';
import * as L from 'partial.lenses';
import * as R from 'ramda';
import { T } from '../api/twitter';

