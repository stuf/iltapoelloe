// @flow

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as twitterActions from '../actions/twitter';
import * as tweetActions from '../actions/tweet';
import Twitter from '../components/Twitter';

const mapStateToProps = (state) => ({
  twitter: state.twitter,
  tweet: state.tweet
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    twitter: bindActionCreators(twitterActions, dispatch),
    tweet: bindActionCreators(tweetActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Twitter);
