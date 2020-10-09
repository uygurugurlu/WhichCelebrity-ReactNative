import React, {Component} from 'react';
import {View} from 'react-native';
import {styles} from './SignInStyles';
import {signIn} from '../../common/Functions/GoogleSignInFunctions';
import {connect} from 'react-redux';
import {GoogleSigninButton} from '@react-native-community/google-signin';

class SignIn extends Component {
  render() {
    return (
      <View style={styles.container}>
        <GoogleSigninButton
          style={{width: 192, height: 48}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => signIn}
        />
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    /* language: state.mainReducer.language,
    userAvatarSource: state.mainReducer.userAvatarSource,
    userAvatarB64: state.mainReducer.userAvatarB64,
    user_agent: state.mainReducer.user_agent,
    detected_face_count: state.mainReducer.detected_face_count,
  */
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    /* get_user_avatar_source: (source, base64_data) =>
            dispatch(get_user_avatar_source(source, base64_data)),
          get_detected_face_count: (count) =>
            dispatch(get_detected_face_count(count)),
        }; */
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
