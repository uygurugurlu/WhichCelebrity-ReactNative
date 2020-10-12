import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Platform,
  ImageBackground,
  Alert,
  Image,
  Text,
  TouchableHighlight,
} from 'react-native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {setI18nConfig} from '../I18n';
import {
  authenticate_user,
  unauthenticate_user,
  get_user_data,
  first_time_login,
  get_user_agent,
  set_language,
  set_auth_token,
} from '../Store/Actions';
import StarterPagesStack from './Starter/StarterPagesStack';
import {AUTH_TOKEN} from  '../../src/config/index';
import {DEVICE_HEIGHT, DEVICE_WIDTH, CAMERAICON} from '../common/Constants';
import DeviceInfo from 'react-native-device-info';
import UpdateApp from '../Screens/UpdateAppScreen/UpdateApp';
import SignIn from '../Screens/SignIn/SignIn';

import {page_body_background_color, button_colors} from '../common/ColorIndex';
import MainPagesStack from './MainStack';
import UserAgent from 'react-native-user-agent';
import {GetAppVersion} from '../common/Functions/Endpoints/GetAppVersion';
import {PerformTimeConsumingTask} from '../common/Functions/PerformTimeConsumingTask';
import crashlytics from '@react-native-firebase/crashlytics';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {IMAGEBACK} from '../common/Constants';
import {PostIdToken} from '../common/Functions/Endpoints/PostIdToken';
import {ConfirmUser} from '../common/Functions/Endpoints/ConfirmUser';

import {
  signInFunction,
  isSignedIn,
  signOut,
  getCurrentUserInfo,
} from '../common/Functions/GoogleSignInFunctions';
import {storeData, getData} from '../common/Functions/ManageAsyncData';
import {Drawer} from './Drawer';
import {GoogleSigninButton} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import {AppleButton} from '@invertase/react-native-apple-authentication';
import {onAppleButtonPress} from '../common/Functions/AppleSignInFunctions';
<<<<<<< HEAD
=======

>>>>>>> 32d62cbc1ac0389582b044096d52ca11ba5b8c24
const MyDrawer = createDrawerNavigator();
class SwitchNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      update_needed: false,
      name: '',
      mail: '',
      photo: '',
    };
  }
  handlePostIdToken = async (idToken) => {
    try {
      var IdTokenResponse = await PostIdToken(idToken);
      this.props.set_auth_token(
        IdTokenResponse.data.access_token,
      );
      storeData('@auth_token', IdTokenResponse.data.access_token);

      return true;
    } catch (error) {
      console.error('error post id token', error);
      this.props.set_auth_token(
        AUTH_TOKEN,
      );
      storeData('@auth_token', AUTH_TOKEN);

      return false;
    }

  };
  handleGoogleSignIn = async () => {
    var signInInfo = await signInFunction();
    console.log('signInInfo', signInInfo);
    if (signInInfo == -1) {
      Alert.alert('User Canceled Sign In');
    } else if (signInInfo == -2) {
      Alert.alert('In progress error');
    } else if (signInInfo == -3) {
      Alert.alert('Play services not available');
    } else if (signInInfo == -4) {
      Alert.alert('Error');
    } else {
      var currentUserIdToken = await auth().currentUser.getIdToken();
      this.handlePostIdToken(currentUserIdToken);
      console.log('current user id token: ', currentUserIdToken);

      storeData('@UserInfo', signInInfo);

      this.props.authenticate_user();
      this.props.get_user_data(currentUserIdToken);
      this.setState({
        name: signInInfo.user.displayName,
        mail: signInInfo.user.email,
        photo: signInInfo.user.photoURL,
      });
    }
  };
  handleAppleSignIn = () => {
    console.log(onAppleButtonPress());
  };
  handleIsSignedIn = async () => {
    try {
      var signInInfo = JSON.parse(await AsyncStorage.getItem('@UserInfo'));
      var IsGoogleSignedIn = await isSignedIn()
    
        var res = await AsyncStorage.getItem('@auth_token');
            if(res !== null){
              var serviceUserData = await ConfirmUser(JSON.parse(res));

              //BUNLAR EŞİT Mİ DİYE KONTROL ET
              console.log("serviceUser: ",serviceUserData.data.data.id);
              console.log("current user: ",auth().currentUser );


              if (signInInfo !== null && IsGoogleSignedIn) {
               
              this.props.set_auth_token(JSON.parse(res));
              var currentUserIdToken = await auth().currentUser.getIdToken();
              this.props.authenticate_user();
              this.props.get_user_data(currentUserIdToken);
              this.setState({
                name: signInInfo.user.displayName,
                mail: signInInfo.user.email,
                photo: signInInfo.user.photoURL,
              });
  
            }
            else {
              this.handleSignOut();
            }
        }
        else {
          this.handleSignOut();
        }
    } catch (error) {
      console.warn("Error handling sign in, ",error)
      this.handleSignOut();
    }

  };
  handleSignOut = async () => {
    try {
      auth()
        .signOut()
        .then(() => console.log('User signed out!'));
        this.props.unauthenticate_user();
        AsyncStorage.removeItem('@UserInfo');
        storeData('@auth_token', AUTH_TOKEN);
       this.props.get_user_data(null);
       this.props.set_auth_token(AUTH_TOKEN);
    } catch (error) {
      console.log('error signing out: ', error);
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

    await UserAgent.getWebViewUserAgent() //asynchronous
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
    const {data} = await GetAppVersion(this.props.user_agent);
    console.log('GetVersion Api doğru çalıştı ...', data);

    try {
      /** APP VERSION ON DEVICE */
      let version = DeviceInfo.getVersion();
      let min_sup_ver_android = data.android.minimum_supported_version;
      let min_sup_ver_ios = data.ios.minimum_supported_version;

      console.log('agent version: ', version);

      console.log('min_sup_ver_android: ', min_sup_ver_android);
      console.log('min_sup_ver_ios: ', min_sup_ver_ios);

      console.log('split: ', min_sup_ver_android.split('.'));

      const agent_version_split = version.split('.');
      const min_sup_ver_android_split = min_sup_ver_android.split('.');
      const min_sup_ver_ios_split = min_sup_ver_ios.split('.');

      let agent_version = 0;

      if (agent_version_split[2]) {
        agent_version =
          agent_version_split[0] * 1000000 +
          agent_version_split[1] * 100 +
          agent_version_split[2];
      } else {
        agent_version =
          agent_version_split[0] * 1000000 + agent_version_split[1] * 100;
      }

      const min_sup_android_version =
        Number(min_sup_ver_android_split[0]) * 1000000 +
        Number(min_sup_ver_android_split[1]) * 100 +
        Number(min_sup_ver_android_split[2]);
      const min_sup_ios_version =
        Number(min_sup_ver_ios_split[0]) * 1000000 +
        Number(min_sup_ver_ios_split[1]) * 100 +
        Number(min_sup_ver_ios_split[2]);

      console.log('agent_version: ', agent_version);
      console.log('min_sup_android_version: ', min_sup_android_version);
      console.log('min_sup_ios_version: ', min_sup_ios_version);

      if (Platform.OS === 'android') {
        if (agent_version < min_sup_android_version) {
          this.setState({update_needed: true});
        }
      } else if (Platform.OS === 'ios') {
        if (agent_version < min_sup_ios_version) {
          this.setState({update_needed: true});
        }
      }
    } catch (e) {
      crashlytics().recordError(e);
      console.log('version control error: ', e);
    }
  };

  render() {
    const {is_the_login_first_time, isLoggedIn} = this.props;
    const {update_needed} = this.state;
    if (update_needed) {
      return <UpdateApp />;
    } else if (is_the_login_first_time === null) {
      return (
        <View style={styles.indicatorContainer}>
          <ImageBackground source={IMAGEBACK} style={styles.imageBack}>
            <ActivityIndicator size="large" color={'white'} />
          </ImageBackground>
        </View>
      );
    } else {
      return (
        <NavigationContainer>
          {is_the_login_first_time ? (
            <StarterPagesStack />
          ) : (
            <MyDrawer.Navigator
              drawerContent={() => {
                return isLoggedIn ? (
                  <View style={styles.container}>
                    <View style={styles.avatarContainer}>
                      <View style={styles.avatarWrapper}>
                        <Image
                          source={{uri: this.state.photo}}
                          style={styles.avatarImage}
                        />
                      </View>
                    </View>
                    <View style={styles.contentContainer}>
                      <View style={styles.signInButtonContainer}>
                        <Text style={styles.title}>{this.state.name}</Text>
                      </View>
                      <TouchableHighlight
                        style={styles.signout}
                        onPress={() => this.handleSignOut()}>
                        <Text style={styles.button}>Çıkış Yap</Text>
                      </TouchableHighlight>
                      <TouchableHighlight
                          style={styles.signout}
                          onPress={() => console.log(PostIdToken(this.state.idToken))}>
                        <Text style={styles.button}>Send</Text>
                      </TouchableHighlight>
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
                            style={{width: 192, height: 48}}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Dark}
                            onPress={() => this.handleGoogleSignIn()}
                          />
                        )}
                      </View>
                    </View>
                  </View>
                );
              }}>
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
}

export const styles = StyleSheet.create({
  indicatorContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  imageBack: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgb(70,70,70)',
  },
  avatarContainer: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarWrapper: {
    flex: 0.6,
    borderRadius: 100,
    aspectRatio: 1,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  avatarImage: {
    resizeMode: 'cover',
    height: DEVICE_WIDTH * 0.6,
    width: DEVICE_WIDTH * 0.6,
  },
  title: {
    color: 'white',
    fontSize: 20,
  },
  contentContainer: {
    flex: 0.6,
    justifyContent: 'space-between',
  },
  signInButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signout: {
    height: 50,
    backgroundColor: button_colors,
    borderRadius: 30,
    justifyContent: 'center',
    marginVertical: 30,
    marginHorizontal: 30,
  },
  button: {
    marginHorizontal: 20,
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    is_the_login_first_time: state.mainReducer.is_the_login_first_time,
    language: state.mainReducer.language,
    isLoggedIn: state.mainReducer.isLoggedIn,
    user_data: state.mainReducer.user_data,
    auth_token: state.mainReducer.auth_token,
    user_agent: state.mainReducer.user_agent,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    first_time_login: (is_first) => dispatch(first_time_login(is_first)),
    get_user_agent: (agent) => dispatch(get_user_agent(agent)),
    set_language: (language) => dispatch(set_language(language)),
    authenticate_user: () => dispatch(authenticate_user()),
    unauthenticate_user: () => dispatch(unauthenticate_user()),
    get_user_data: (data) => dispatch(get_user_data(data)),
    set_auth_token: (data) => dispatch(set_auth_token(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SwitchNavigation);
