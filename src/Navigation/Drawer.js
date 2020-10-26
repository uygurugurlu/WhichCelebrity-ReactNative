import React, { Component } from 'react';
import {
  View, Image, Text, TouchableHighlight, Platform, Alert, TouchableOpacity,
} from 'react-native'
import { GoogleSigninButton } from '@react-native-community/google-signin';
import Tooltip from 'rn-tooltip';
import { Button, Icon } from 'react-native-elements'
import { AppleButton } from '@invertase/react-native-apple-authentication';
import { connect } from 'react-redux';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import { styles } from './DrawerStyles';
import { AVATARICON } from '../common/Constants'
import { translate } from '../I18n';
import { header_background_color, yellow_text_color } from '../common/ColorIndex'
import {
  authenticate_user,
  first_time_login,
  get_user_agent, set_auth_token,
  unauthenticate_user,
  set_face_sharing_active,
  set_face_sharing_inactive,
  set_in_app,
} from '../Store/Actions';
import { GrantPermission } from '../common/Functions/Endpoints/GrantPermission';
import { UngrantPermission } from '../common/Functions/Endpoints/UngrantPermission';
import { storeData } from '../common/Functions/ManageAsyncData';
import { isSignedIn, signInFunction } from '../common/Functions/GoogleSignInFunctions';
import { PostIdToken } from '../common/Functions/Endpoints/PostIdToken';
import { onAppleButtonPress } from '../common/Functions/AppleSignInFunctions';
import { ConfirmUser } from '../common/Functions/Endpoints/ConfirmUser';
import { AUTH_TOKEN } from '../config';
import { LogoutUser } from '../common/Functions/Endpoints/LogoutUser';
import {
  TourGuideZone, // Main wrapper of highlight component
  TourGuideZoneByPosition, // Component to use mask on overlay (ie, position absolute)
  useTourGuideController, // hook to start, etc.
} from 'rn-tourguide'
import { GoogleSigninButtonComponent } from './GoogleSigninButtonComponent'
//import { AppleSigninButtonComponent } from './AppleSigninButtonComponent'


class CustomDrawer extends Component {
  constructor() {
    super();
    this.state = {
      photo: '',
      name: '',
      faceInfoText: '',
    };
  }

  componentWillMount = async () => {
    await this.handleIsSignedIn();
  }

  faceShare = async () => {
    let permissionGranted;
    try {
      this.setState({ faceInfoText: translate('drawer.face_info') + translate('drawer.active') });
      this.props.set_face_sharing_active();
      permissionGranted = await GrantPermission(this.props.auth_token, this.props.user_agent);
      if (permissionGranted.status !== 200) {
        Alert.alert(translate('error.switch'));
        this.setState({ faceInfoText: translate('drawer.face_info') + translate('drawer.passive') });
        this.props.set_face_sharing_inactive();
      }
      console.log(permissionGranted);
    } catch (e) {
      console.warn('error switch change: ', e);
    }
  }
  handleFaceShare = async () => {
    Alert.alert(
      translate('drawer.alert_title'),
      translate('drawer.alert_desc'),
      [
        {
          text: translate("drawer.cancel"),
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: translate("drawer.ok"), onPress: () => this.faceShare() }
      ],
      { cancelable: false }
    );

  }

  setSignIn = async (idToken, signInInfo) => {
    this.props.set_auth_token(
      idToken,
    );
    storeData('@auth_token', idToken);
    storeData('@UserInfo', signInInfo);

    this.props.authenticate_user();
    this.setState({
      name: signInInfo.user.displayName,
      photo: signInInfo.user.photoURL,
    });
  }

  handleGoogleSignIn = async () => {
    const signInInfo = await signInFunction();
    console.log('signInInfo', signInInfo);
    if (signInInfo == -1) {
      Alert.alert(translate('error.canceled'));
    } else if (signInInfo == -2) {
      Alert.alert(translate('error.in_progress'));
    } else if (signInInfo == -3) {
      Alert.alert(translate('error.not_available'));
    } else if (signInInfo == -4) {
      Alert.alert(translate('error.error'));
    } else {
      const currentUserIdToken = await auth().currentUser.getIdToken();
      console.log('current user id token: ', currentUserIdToken);
      const IdTokenResponse = await PostIdToken(currentUserIdToken, this.props.user_agent);
      try {

        console.log('Id token response: ', IdTokenResponse.data.original.access_token);
        await this.setSignIn(IdTokenResponse.data.original.access_token, signInInfo);

        const userStatus = await ConfirmUser(IdTokenResponse.data.original.access_token);

        console.log('userStatus: ', userStatus);
        if(userStatus.data.data.is_opt_in) {
          this.props.set_face_sharing_active();
        }
        else {
          this.props.set_face_sharing_inactive();
        }
      } catch (error) {
        if (error instanceof TypeError) {
          const idToken = JSON.parse(`${IdTokenResponse.data}}`).original.access_token;
          await this.setSignIn(idToken, signInInfo);
          console.log('new id token: ', idToken);
          const userStatus = await ConfirmUser(IdTokenResponse.data.original.access_token);

          console.log('userStatus: ', userStatus);
          if(userStatus.data.data.is_opt_in) {
            this.props.set_face_sharing_active();
          }
          else {
            this.props.set_face_sharing_inactive();
          }
        } else {
          console.warn('error post id token', error);
          await this.handleSignOut();
        }
      }
    }
  };

  handleAppleSignIn = () => {
    console.log(onAppleButtonPress());
  };

  handleIsSignedIn = async () => {
    try {
      const signInInfo = JSON.parse(await AsyncStorage.getItem('@UserInfo'));
      const IsGoogleSignedIn = await isSignedIn();

      const res = await AsyncStorage.getItem('@auth_token');
      console.log('Current auth token: ', res);
      if (res !== null) {
        console.log('current user: ', auth().currentUser);
        if (signInInfo !== null && IsGoogleSignedIn) {
          this.props.set_auth_token(JSON.parse(res));
          // const currentUserIdToken = await auth().currentUser.getIdToken();
          const userStatus = await ConfirmUser(JSON.parse(res));
          if (userStatus.status !== 200) {
            throw 'user not authenticated';
          }
          console.log('userStatus: ', userStatus);
          if(userStatus.data.data.is_opt_in) {
            this.props.set_face_sharing_active();
          }
          else {
            this.props.set_face_sharing_inactive();
          }
          this.props.authenticate_user();
          this.setState({
            name: signInInfo.user.displayName,
            photo: signInInfo.user.photoURL,
          });
        } else {
          this.handleSignOut();
        }
      } else {
        this.handleSignOut();
      }
    } catch (error) {
      console.warn('Error handling is signed in, ', error);
      this.handleSignOut();
    }
  };

  handleSignOut = async () => {
    try {
      this.props.unauthenticate_user();
      auth()
        .signOut()
        .then(() => console.log('User signed out!'));
      if (this.props.auth_token !== AUTH_TOKEN) {
        const loggedOut = await LogoutUser(this.props.auth_token);
        if (loggedOut.status !== 200) throw 'Server error signing out';
      }
      AsyncStorage.removeItem('@UserInfo');
      AsyncStorage.removeItem('@auth_token');
      this.props.set_auth_token(AUTH_TOKEN);
    } catch (error) {
      console.log('error signing out: ', error);
      this.props.unauthenticate_user();
      AsyncStorage.removeItem('@UserInfo');
      AsyncStorage.removeItem('@auth_token');
      this.props.set_auth_token(AUTH_TOKEN);
    }
  };

  render() {
    const { isLoggedIn } = this.props;
    return (
      (isLoggedIn ? (
        <View style={styles.container}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarWrapper}>
              <Image
                source={this.state.photo ? { uri: this.state.photo } : AVATARICON}
                style={styles.avatarImage}
              />
            </View>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.signInButtonContainer}>
              <Text style={styles.title}>{this.state.name}</Text>
            </View>
            {
              !this.props.face_sharing ? (
            <View style={styles.switchContainer}>
              <Tooltip height={300} containerStyle={styles.tooltipContainerStyle} popover={<Text style={styles.tooltipText}>{translate('drawer.tooltip')}</Text>}>
                <View style={styles.tooltipContent}>
                  <Text style={styles.switchText}>{translate('drawer.face_info') + translate('drawer.passive')}</Text>
                  <Icon name="info" style={styles.iconStyle} color="white" />
                </View>
              </Tooltip>

                  <Button
                    icon={<Icon name={'share'} color={'#fff'} /> }
                    iconRight
                    title={translate("drawer.faceShare")}
                    containerStyle={styles.faceShareButton}
                    buttonStyle={{backgroundColor:yellow_text_color}}
                    onPress={() => this.handleFaceShare()}
                  />
            </View>
                ): (null)
            }
            <View style={styles.signOutContainer}>
              <TouchableHighlight
                style={styles.signout}
                onPress={() => this.handleSignOut()}
              >
                <Text style={styles.button}>Çıkış Yap</Text>
              </TouchableHighlight>
            </View>

          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarWrapper}>
              <Image source={AVATARICON} style={styles.avatarImage} />
            </View>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.signInButtonContainer}>
              {Platform.OS == 'ios' ? (
              /*  <AppleSigninButtonComponent handleAppleSignIn={this.handleAppleSignIn} />*/
            null
              ) : (
                <GoogleSigninButtonComponent handleGoogleSignIn={this.handleGoogleSignIn} />
              )}
            </View>
          </View>
        </View>
      )
      ));
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.mainReducer.isLoggedIn,
  auth_token: state.mainReducer.auth_token,
  user_agent: state.mainReducer.user_agent,
  face_sharing: state.mainReducer.face_sharing

});

const mapDispatchToProps = (dispatch) => ({
  first_time_login: (is_first) => dispatch(first_time_login(is_first)),
  get_user_agent: (agent) => dispatch(get_user_agent(agent)),
  authenticate_user: () => dispatch(authenticate_user()),
  unauthenticate_user: () => dispatch(unauthenticate_user()),
  set_auth_token: (data) => dispatch(set_auth_token(data)),
  set_face_sharing_active: () => dispatch(set_face_sharing_active()),
  set_face_sharing_inactive: () => dispatch(set_face_sharing_inactive()),
  set_in_app: () => dispatch(set_in_app()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer);
