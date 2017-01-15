// @flow
import React, { section, article } from 'karet';
import K, * as U from 'karet.util';

const getArgs = (list, reverse) =>
  [list, U.indices, ...(reverse ? [U.reverse] : [])];

export default ({
  Component = section,
  Item = article,
  list,
  reverse,
  itemId
}: *) =>
  <Component>
    {U.seq(
      list,
      U.indices,
      ...(reverse ? [U.reverse] : []),
      U.mapCached(i =>
        <Item
          key={!itemId ? i : 0}
          item={U.view(i, list)}
        />)
    )}
  </Component>;
