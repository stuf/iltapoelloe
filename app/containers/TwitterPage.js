// @flow

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/twitter';
import Twitter from '../components/Twitter';

const mapStateToProps = (state) => ({
  twitter: state.twitter
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Twitter);
