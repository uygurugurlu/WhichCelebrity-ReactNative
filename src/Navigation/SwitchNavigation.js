import React from 'react';
import {
  ActivityIndicator,
  View,
  Platform,
  ImageBackground,
  Alert,
  Image,
  Text,
  TouchableHighlight, Switch,
} from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import UserAgent from 'react-native-user-agent';
import crashlytics from '@react-native-firebase/crashlytics';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { GoogleSigninButton } from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import { AppleButton } from '@invertase/react-native-apple-authentication';
import Tooltip from 'rn-tooltip';
import { Icon } from 'react-native-elements';
import { styles } from './SwitchNavigationStyles';
import { setI18nConfig, translate } from '../I18n';
import {
  authenticate_user,
  unauthenticate_user,
  first_time_login,
  get_user_agent,
  set_language,
  set_auth_token,
} from '../Store/Actions';
import StarterPagesStack from './Starter/StarterPagesStack';
import { AUTH_TOKEN } from '../config/index';
import {
  CAMERAICON, IMAGEBACK
} from '../common/Constants';
import UpdateApp from '../Screens/UpdateAppScreen/UpdateApp';

import MainPagesStack from './MainStack';
import { GetAppVersion } from '../common/Functions/Endpoints/GetAppVersion';
import { PerformTimeConsumingTask } from '../common/Functions/PerformTimeConsumingTask';

import { PostIdToken } from '../common/Functions/Endpoints/PostIdToken';
import { ConfirmUser } from '../common/Functions/Endpoints/ConfirmUser';

import {
  signInFunction,
  isSignedIn,
} from '../common/Functions/GoogleSignInFunctions';
import { storeData } from '../common/Functions/ManageAsyncData';
import { Drawer } from './Drawer';
import { onAppleButtonPress } from '../common/Functions/AppleSignInFunctions';
import { LogoutUser } from '../common/Functions/Endpoints/LogoutUser';
import { GrantPermission } from '../common/Functions/Endpoints/GrantPermission';
import { UngrantPermission } from '../common/Functions/Endpoints/UngrantPermission';
import { header_background_color } from '../common/ColorIndex';

const MyDrawer = createDrawerNavigator();
class SwitchNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      update_needed: false,
      name: '',
      photo: '',
      isSwitchEnabled: false,
      faceInfoText: '',
    };
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
      faceInfoText: translate('drawer.face_info') + translate('drawer.passive'),
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
        this.setSignIn(IdTokenResponse.data.original.access_token, signInInfo);
        this.handleSwitchChange(true);
      } catch (error) {
        if (error instanceof TypeError) {
          const idToken = JSON.parse(`${IdTokenResponse.data}}`).original.access_token;
          this.setSignIn(idToken, signInInfo);
          console.log('new id token: ', idToken);
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
            throw 'user not authanticated';
          }
          console.log('userStatus: ', userStatus);
          this.handleSwitchChange(userStatus.data.data.is_opt_in);
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

  getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // value previously stored
        console.log('value previously stored: ', key);
        switch (key) {
          case 'LOGGED_IN_FIRST_TIME':
            this.props.first_time_login(false);
            break;
        }
      } else {
        // value previously stored not stored
        console.log('value previously not stored: ', key);
        switch (key) {
          case 'LOGGED_IN_FIRST_TIME':
            this.props.first_time_login(true);
            break;
        }
      }
    } catch (e) {
      // error reading value
      crashlytics().recordError(e);
      console.log('error reading value: ', e);
    }
  };

  componentWillMount = async () => {
    await this.handleIsSignedIn();

    const data = await PerformTimeConsumingTask(1000);
    await this.GetVersion();

    await UserAgent.getWebViewUserAgent() // asynchronous
      .then((ua) => {
        this.props.get_user_agent(ua);
        console.log('Agent: ', ua);
      })
      .catch((e) => {
        crashlytics().recordError(e);
        console.log('user agent error: ', e);
      });

    if (data !== null) {
      await this.getData('LOGGED_IN_FIRST_TIME');
    }
  };

  componentDidMount = async () => {
    await this.SetI18nConfig();
  };

  SetI18nConfig = async () => {
    let value = '';
    try {
      value = await AsyncStorage.getItem('USER_LANGUAGE');
      console.log('value: ', JSON.parse(value));
    } catch (e) {
      crashlytics().recordError(e);
      console.log("couldn't get value from ASYNC STORAGE");
    }

    setI18nConfig((language) => this.props.set_language(language)); // set initial config
  };

  shouldComponentUpdate = async (nextProps, nextState) => {
    if (nextProps.language.languageTag !== this.props.language.languageTag) {
      await setI18nConfig(); // set initial config
    }
  };

  GetVersion = async () => {
    console.log('user_agent: ', this.props.user_agent);
    const { data } = await GetAppVersion(this.props.user_agent);
    console.log('GetVersion Api doğru çalıştı ...', data);

    try {
      /** APP VERSION ON DEVICE */
      const version = DeviceInfo.getVersion();
      const min_sup_ver_android = data.android.minimum_supported_version;
      const min_sup_ver_ios = data.ios.minimum_supported_version;

      console.log('agent version: ', version);

      console.log('min_sup_ver_android: ', min_sup_ver_android);
      console.log('min_sup_ver_ios: ', min_sup_ver_ios);

      console.log('split: ', min_sup_ver_android.split('.'));

      const agent_version_split = version.split('.');
      const min_sup_ver_android_split = min_sup_ver_android.split('.');
      const min_sup_ver_ios_split = min_sup_ver_ios.split('.');

      let agent_version = 0;

      if (agent_version_split[2]) {
        agent_version = agent_version_split[0] * 1000000
          + agent_version_split[1] * 100
          + agent_version_split[2];
      } else {
        agent_version = agent_version_split[0] * 1000000 + agent_version_split[1] * 100;
      }

      const min_sup_android_version = Number(min_sup_ver_android_split[0]) * 1000000
        + Number(min_sup_ver_android_split[1]) * 100
        + Number(min_sup_ver_android_split[2]);
      const min_sup_ios_version = Number(min_sup_ver_ios_split[0]) * 1000000
        + Number(min_sup_ver_ios_split[1]) * 100
        + Number(min_sup_ver_ios_split[2]);

      console.log('agent_version: ', agent_version);
      console.log('min_sup_android_version: ', min_sup_android_version);
      console.log('min_sup_ios_version: ', min_sup_ios_version);

      if (Platform.OS === 'android') {
        if (agent_version < min_sup_android_version) {
          this.setState({ update_needed: true });
        }
      } else if (Platform.OS === 'ios') {
        if (agent_version < min_sup_ios_version) {
          this.setState({ update_needed: true });
        }
      }
    } catch (e) {
      crashlytics().recordError(e);
      console.log('version control error: ', e);
    }
  };

  handleSwitchChange = async (res) => {
    let permissionGranted;
    try {
      if (res) {
        this.setState({ faceInfoText: translate('drawer.face_info') + translate('drawer.active'), isSwitchEnabled: true });
        permissionGranted = await GrantPermission(this.props.auth_token, this.props.user_agent);
        if (permissionGranted.status !== 200) {
          Alert.alert(translate('error.switch'));
          this.setState({ faceInfoText: translate('drawer.face_info') + translate('drawer.passive'), isSwitchEnabled: false });
        }
        console.log(permissionGranted);
      } else {
        this.setState({ faceInfoText: translate('drawer.face_info') + translate('drawer.passive'), isSwitchEnabled: false });
        permissionGranted = await UngrantPermission(this.props.auth_token, this.props.user_agent);
        if (permissionGranted.status !== 200) {
          Alert.alert(translate('error.switch'));
          this.setState({ faceInfoText: translate('drawer.face_info') + translate('drawer.passive'), isSwitchEnabled: false });
        }
      }
    } catch (e) {
      console.warn('error switch change: ', e);
    }
  }

  render() {
    const { is_the_login_first_time, isLoggedIn } = this.props;
    const { update_needed } = this.state;
    if (update_needed) {
      return <UpdateApp />;
    } if (is_the_login_first_time === null) {
      return (
        <View style={styles.indicatorContainer}>
          <ImageBackground source={IMAGEBACK} style={styles.imageBack}>
            <ActivityIndicator size="large" color="white" />
          </ImageBackground>
        </View>
      );
    }
    return (
      <NavigationContainer>
        {is_the_login_first_time ? (
          <StarterPagesStack />
        ) : (
          <MyDrawer.Navigator
            drawerContent={() => (isLoggedIn ? (
              <View style={styles.container}>
                <View style={styles.avatarContainer}>
                  <View style={styles.avatarWrapper}>
                    <Image
                      source={{ uri: this.state.photo }}
                      style={styles.avatarImage}
                    />
                  </View>
                </View>
                <View style={styles.contentContainer}>
                  <View style={styles.signInButtonContainer}>
                    <Text style={styles.title}>{this.state.name}</Text>
                  </View>
                  <View style={styles.switchContainer}>
                    <Tooltip height={300} containerStyle={styles.tooltipContainerStyle} popover={<Text style={styles.tooltipText}>{translate('drawer.tooltip')}</Text>}>
                      <View style={styles.tooltipContent}>
                        <Text style={styles.switchText}>{this.state.faceInfoText}</Text>
                        <Icon name="info" style={styles.iconStyle} color="white" />
                      </View>
                    </Tooltip>
                    <Switch
                      trackColor={{ false: '#767577', true: header_background_color }}
                      thumbColor={this.state.isSwitchEnabled ? 'white' : '#f4f3f4'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={(res) => this.handleSwitchChange(res)}
                      value={this.state.isSwitchEnabled}
                    />
                  </View>
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
                    <Image source={CAMERAICON} style={styles.avatarImage} />
                  </View>
                </View>
                <View style={styles.contentContainer}>
                  <View style={styles.signInButtonContainer}>
                    {Platform.OS == 'ios' ? (
                      <AppleButton
                        buttonStyle={AppleButton.Style.WHITE}
                        buttonType={AppleButton.Type.SIGN_IN}
                        style={{
                          width: 160, // You must specify a width
                          height: 45, // You must specify a height
                        }}
                        onPress={() => this.handleAppleSignIn()}
                      />
                    ) : (
                      <GoogleSigninButton
                        style={{ width: 192, height: 48 }}
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Dark}
                        onPress={() => this.handleGoogleSignIn()}
                      />
                    )}
                  </View>
                </View>
              </View>
            ))}
          >
            <MyDrawer.Screen
              name="MainPagesStack"
              component={MainPagesStack}
            />
          </MyDrawer.Navigator>
        )}
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  is_the_login_first_time: state.mainReducer.is_the_login_first_time,
  language: state.mainReducer.language,
  isLoggedIn: state.mainReducer.isLoggedIn,
  auth_token: state.mainReducer.auth_token,
  user_agent: state.mainReducer.user_agent,

});

const mapDispatchToProps = (dispatch) => ({
  first_time_login: (is_first) => dispatch(first_time_login(is_first)),
  get_user_agent: (agent) => dispatch(get_user_agent(agent)),
  set_language: (language) => dispatch(set_language(language)),
  authenticate_user: () => dispatch(authenticate_user()),
  unauthenticate_user: () => dispatch(unauthenticate_user()),
  set_auth_token: (data) => dispatch(set_auth_token(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SwitchNavigation);
