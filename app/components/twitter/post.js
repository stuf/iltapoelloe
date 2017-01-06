// @flow
import React from 'karet';
import * as U from 'karet.util';
import * as R from 'ramda';
import * as L from 'partial.lenses';
import cx from 'classnames';

import css from './post.css';

const onChangeFn = (atom) =>
  ({ target }) => {
    atom.modify(() => ({
      tweet: target.value,
      chars: target.value.length
    }));
    console.log(atom.view('chars').get());
  };

const textIn = L.compose(L.prop('text'), L.defaults(''));
const charsIn = L.compose(L.prop('chars'), L.defaults(0));

const TweetTextArea = ({ text, ...props }: *) =>
  <textarea
    className={cx('form-control')}
    rows={3}
    {...U.bind({ value: text })}
  />;

const Post = ({ tweet }: *) => {
  const tweetText = tweet.view(textIn);
  const charCount = tweet.view(charsIn);

  return (
    <div className={cx(css.post)}>
      <div>
        <div className={cx('form-group')}>
          <TweetTextArea text={tweetText} />
        </div>
        <div className={cx(css.footer)}>
          <div className={cx('form-group')}>
            <button className={cx('btn btn-primary')}>Post</button>
          </div>
          <div className={cx('form-group')}>
            {charCount}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
