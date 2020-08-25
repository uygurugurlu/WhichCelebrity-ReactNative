import React from 'react';
import {ActivityIndicator, StyleSheet, View, Platform} from 'react-native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {setI18nConfig} from '../I18n';
import {first_time_login, get_user_agent} from '../Store/Actions';
import StarterPagesStack from './Starter/StarterPagesStack';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../CommonlyUsed/Constants';
import axios from 'axios';
import {ResponseHandler} from '../CommonlyUsed/Functions/ResponseHandler';
import DeviceInfo from 'react-native-device-info';
import UpdateApp from '../Screens/UpdateAppScreen/UpdateApp';
import {page_body_background_color} from '../CommonlyUsed/ColorIndex';
import MainPagesStack from './MainStack';
import {Config} from 'react-native-config';
import UserAgent from 'react-native-user-agent';

class SwitchNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      update_needed: false,
    };
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
      console.log('error reading value: ', e);
    }
  };

  componentWillMount = async () => {
    const data = await this.performTimeConsumingTask(1000);
    await this.GetVersion();

    await UserAgent.getWebViewUserAgent() //asynchronous
      .then(ua => {
        this.props.get_user_agent(ua);
      })
      .catch(e => {
        console.log('user agent error: ', e);
      });

    if (data !== null) {
      await this.getData('LOGGED_IN_FIRST_TIME');
    }
  };

  performTimeConsumingTask = async (timeout) => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve('result');
      }, timeout),
    );
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
      console.log("couldn't get value from ASYNC STORAGE");
    }

    setI18nConfig(); // set initial config
  };

  shouldComponentUpdate = async (nextProps, nextState) => {
    if (nextProps.language.languageTag !== this.props.language.languageTag) {
      await setI18nConfig(); // set initial config
    }
  };

  GetVersion = async () => {
    console.log("Config.API_URL: ", Config.API_URL);
    await axios({
      method: 'get',
      url: `${Config.API_URL}/version`,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        'User-Agent': this.props.user_agent,
      },
    })
      .then((res) => {
        console.log('GetVersion Api doğru çalıştı ...', res);

        try {
          /** APP VERSION ON DEVICE */
          let version = Number(DeviceInfo.getVersion());
          let min_sup_ver_android = Number(
            res.data.android.minimum_supported_version,
          );
          let min_sup_ver_ios = Number(res.data.ios.minimum_supported_version);

          if (Platform.OS === 'android') {
            if (version < min_sup_ver_android) {
              this.setState({update_needed: true});
            }
          } else if (Platform.OS === 'ios') {
            if (version < min_sup_ver_ios) {
              this.setState({update_needed: true});
            }
          }
        } catch (e) {
          console.log('version control error: ', e);
        }
      })
      .catch((error) => {
        ResponseHandler(error.response);
        console.group('GetVersion Api Api Hatası ...');
        console.table({...error.response.data});
        console.groupEnd();
      });
  };

  render() {
    const {is_the_login_first_time} = this.props;
    const {update_needed} = this.state;

    if (update_needed) {
      return <UpdateApp/>;
    } else if (is_the_login_first_time === null) {
      return (
        <View style={styles.indicatorContainer}>
          <ActivityIndicator size="large" color={'#000'}/>
        </View>
      );
    } else {
      return (
        <NavigationContainer>
          {is_the_login_first_time ? <StarterPagesStack/> : <MainPagesStack/>}
        </NavigationContainer>
      );
    }
  }
}

export const styles = StyleSheet.create({
  indicatorContainer: {
    flex: 1,
    flexDirection: 'column',
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: page_body_background_color,
  },
});

const mapStateToProps = (state) => {
  return {
    is_the_login_first_time: state.mainReducer.is_the_login_first_time,
    language: state.mainReducer.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    first_time_login: (is_first) => dispatch(first_time_login(is_first)),
    get_user_agent: (agent) => dispatch(get_user_agent(agent)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SwitchNavigation);
