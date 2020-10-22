import React from 'react';
import {
  ActivityIndicator,
  View,
  Platform,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import UserAgent from 'react-native-user-agent';
import crashlytics from '@react-native-firebase/crashlytics';
import { createDrawerNavigator } from '@react-navigation/drawer';
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
import {
  IMAGEBACK
} from '../common/Constants';
import UpdateApp from '../Screens/UpdateAppScreen/UpdateApp';
import MainPagesStack from './MainStack';
import { GetAppVersion } from '../common/Functions/Endpoints/GetAppVersion';
import { PerformTimeConsumingTask } from '../common/Functions/PerformTimeConsumingTask';
import CustomDrawer from './Drawer';
import { AppTour, AppTourSequence, AppTourView } from 'react-native-app-tour'

const MyDrawer = createDrawerNavigator();

class SwitchNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      update_needed: false,
    };
    this.appTourTargets = [];

  }

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
    setTimeout(() => {
      let appTourSequence = new AppTourSequence();
      this.appTourTargets.forEach(appTourTarget => {
        appTourSequence.add(appTourTarget);
      });
      AppTour.ShowSequence(appTourSequence);
    }, 1000);
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
            drawerContent={() => (
              <CustomDrawer />
            )}
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
const styles = StyleSheet.create({
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

});
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
