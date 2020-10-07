import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Platform,
  ImageBackground,
  Alert,
  Image,
  Button,
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
} from '../Store/Actions';
import StarterPagesStack from './Starter/StarterPagesStack';
import {DEVICE_HEIGHT, DEVICE_WIDTH, CAMERAICON} from '../common/Constants';
import DeviceInfo from 'react-native-device-info';
import UpdateApp from '../Screens/UpdateAppScreen/UpdateApp';
import SignIn from '../Screens/SignIn/SignIn';

import {page_body_background_color} from '../common/ColorIndex';
import MainPagesStack from './MainStack';
import UserAgent from 'react-native-user-agent';
import {GetAppVersion} from '../common/Functions/Endpoints/GetAppVersion';
import {PerformTimeConsumingTask} from '../common/Functions/PerformTimeConsumingTask';
import crashlytics from '@react-native-firebase/crashlytics';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {IMAGEBACK} from '../common/Constants';
import {CustomDrawerContent} from '../common/Components/DrawerContent';
import {CustomDrawerContentLoggedIn} from '../common/Components/DrawerContentLoggedIn';
import {PostIdToken} from '../common/Functions/Endpoints/PostIdToken';
import {
  signInFunction,
  isSignedIn,
  signOut,
} from '../common/Functions/GoogleSignInFunctions';
import {storeData, getData} from '../common/Functions/ManageAsyncData';
import {Drawer} from './Drawer';
import {GoogleSigninButton} from '@react-native-community/google-signin';

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
      idToken: '',
    };
  }

  handleSignIn = () => {
    signInFunction().then((signInInfo) => {
      console.log(signInInfo);
      if (signInInfo == -1) {
        Alert.alert('User Canceled Sign In');
      } else if (signInInfo == -2) {
        Alert.alert('In progress error');
      } else if (signInInfo == -3) {
        Alert.alert('Play services not available');
      } else if (signInInfo == -3) {
        Alert.alert('Error');
      } else {
        storeData('@UserInfo', signInInfo);
        this.props.authenticate_user();
        this.props.get_user_data(signInInfo);
        var parsed_value = JSON.parse(signInInfo);
        this.setState({
          name: parsed_value.user.name,
          mail: parsed_value.user.email,
          photo: parsed_value.user.photo,
          idToken: parsed_value.idToken,
        });
      }
    });
  };
  handleIsSignedIn = async () => {
    var info = await AsyncStorage.getItem('@UserInfo');
    if (info !== null && isSignedIn()) {
      this.props.authenticate_user();
      console.log('handleissignedin data: ', info);
      this.props.get_user_data(info);
      var parsed_value = JSON.parse(info);
      this.setState({
        name: parsed_value.user.name,
        mail: parsed_value.user.email,
        photo: parsed_value.user.photo,
        idToken: parsed_value.idToken,
      });
    } else {
      this.props.unauthenticate_user();
      storeData('@UserInfo', null);
      this.props.get_user_data(null);
    }
  };
  handleSignOut = async () => {
    try {
      signOut();
      this.props.unauthenticate_user();
      this.props.get_user_data(null);
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
    await this.handleIsSignedIn();
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
    console.log('token ', this.state.idToken);
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
                        <TouchableHighlight
                          onPress={() => this.handleSignOut()}>
                          <Text>Çıkış Yap</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                          onPress={() => PostIdToken(this.state.idToken)}>
                          <Text>Gönder</Text>
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
                        <GoogleSigninButton
                          style={{width: 192, height: 48}}
                          size={GoogleSigninButton.Size.Wide}
                          color={GoogleSigninButton.Color.Dark}
                          onPress={() => this.handleSignIn()}
                        />
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
    flex: 0.8,
    borderRadius: 100,
    aspectRatio: 1,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    resizeMode: 'cover',
    height: DEVICE_HEIGHT * 0.35,
    width: DEVICE_HEIGHT * 0.35,
  },
  title: {
    color: 'white',
    fontSize: 20,
  },
  contentContainer: {
    flex: 0.6,
  },
  signInButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    is_the_login_first_time: state.mainReducer.is_the_login_first_time,
    language: state.mainReducer.language,
    isLoggedIn: state.mainReducer.isLoggedIn,
    user_data: state.mainReducer.user_data,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SwitchNavigation);
