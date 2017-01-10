// @flow
import React from 'karet';
import * as U from 'karet.util';
import * as R from 'ramda';
import * as L from 'partial.lenses';
import cx from 'classnames';

import css from './post.css';

const Tweet = {
  textIn: ['tweet', L.defaults('')],
  charsIn: ['chars', L.defaults(0)],
  selectionIn: ['selection', L.required({})]
};

const onChangeFn = R.curryN(2, (atom, { target }) =>
  atom.modify(() =>
    ({
      tweet: target.value,
      chars: target.value.length,
      selection: {
        start: target.selectionStart,
        end: target.selectionEnd,
        direction: target.selectionDirection
      }
    })
  )
);

const onClickPost = R.curryN(3, (actionFn, atom, event) => {
  console.log('Clicked on post with event: ', event);
  actionFn(atom.view().get());
});

const Post = ({ state, tweetAtom, actions: { postTweet } }: *) =>
  <div className={cx(css.post)}>
    <div>
      <div className={cx('form-group')}>
        <textarea
          className={cx('form-control')}
          rows={3}
          placeholder="Enter tweet text here"
          onChange={onChangeFn(tweetAtom)}
        />
      </div>
      <div className={cx(css.footer)}>
        <div className={cx('form-group')}>
          <button onClick={onClickPost(postTweet, tweetAtom)} className={cx('btn btn-primary')}>Post</button>
        </div>
        <div className={cx('form-group')}>
          {U.view(Tweet.charsIn, tweetAtom)} / 160
        </div>
      </div>
      <div>
        <pre>{JSON.stringify(state)}</pre>
      </div>
    </div>
  </div>;

export default Post;
