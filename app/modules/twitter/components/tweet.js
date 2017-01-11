// @flow
import React from 'karet';
import K, * as U from 'karet.util';
import * as L from 'partial.lenses';

const usernameIn = U.view(['user', L.define({}), 'screen_name']);
const timestampIn = U.view('created_at');
const textIn = U.view('text');

export default ({ status }: *) =>
  <div>
    <div>
      <strong>{usernameIn(status)}</strong>
    </div>
    <div>
      <small>{timestampIn(status)}</small>
    </div>
    <blockquote className="blockquote">
      <p>{textIn(status)}</p>
    </blockquote>
  </div>;
