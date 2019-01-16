import { connect } from 'react-redux';
import SignIn from '../components/SignIn';
import { signIn } from '../actions/index';

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (userName) => {
      dispatch(signIn(userName));
    },
  };
};

const SignInContainer = connect(null, mapDispatchToProps)(SignIn);

export default SignInContainer;
