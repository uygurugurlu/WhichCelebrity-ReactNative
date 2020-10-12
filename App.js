//   88|4dQ0wDZTc5346tTHGRXKbbtDRUlA7cja3V2FNc5Y
//   http://192.168.1.113:8000
//    https://api.myface.io
//    1657|VXWE09dkbvKbAagr3DOz36NdZCUZxOQCkcTb0DhS

import React, {useEffect} from 'react';
import configureStore from './src/Store/ConfigureStore';
import {Provider} from 'react-redux';
import SwitchNavigation from './src/Navigation/SwitchNavigation';
import {setI18nConfig} from './src/I18n';
import messaging from '@react-native-firebase/messaging';
import {Alert, StatusBar} from 'react-native';
import admob, {MaxAdContentRating} from '@react-native-firebase/admob';
import {configureFontAwesomePro} from 'react-native-fontawesome-pro';
import axios from 'axios';
import {header_background_color} from './src/common/ColorIndex';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

configureFontAwesomePro();
const store = configureStore();

function App() {
  GoogleSignin.configure({
    webClientId:
      '93591380261-076oe651jsdnrr01kol349k11s8eh0hq.apps.googleusercontent.com',
    offlineAccess: true,
  });
  let init = async () => {
    await requestUserPermission();
    await AdMobConfigure();
    await setI18nConfig();
  };

  const AxiosInterceptors = () => {
    /** Print Every Response to the Console*/
    axios.interceptors.response.use(
      (res) => {
        console.group('interceptor response', res);
        //console.log('status is:' + status);
        //console.table(data);
        console.groupEnd();
        return res;
      },
      (err) => {
        console.log('interceptor err.response: ', err.response);
        console.log('interceptor err.response.status: ', err.response.status);
        if (err.response.status === 404) {
          throw new Error(`${err.config.url} not found`);
        }
        throw err;
      },
    );

    /** Add default query parameter to axios. */
    axios.interceptors.request.use(
      (config) => {
        config.params = {...config.params, locale: 'tr'};
        console.group('interceptor request');
        console.table(config);
        console.groupEnd();
        return config;
      },
      function (error) {
        return Promise.reject(error);
      },
    );
  };

  const AdMobConfigure = () => {
    admob()
      .setRequestConfiguration({
        // Update all future requests suitable for parental guidance
        maxAdContentRating: MaxAdContentRating.PG,

        // Indicates that you want your content treated as child-directed for purposes of COPPA.
        tagForChildDirectedTreatment: true,

        // Indicates that you want the ad request to be handled in a
        // manner suitable for users under the age of consent.
        tagForUnderAgeOfConsent: true,
      })
      .then(() => {
        // Request config successfully set!
      });
  };

  /** FCM Token*/
  useEffect(() => {
    init().finally(() => {
      AxiosInterceptors();
    });

    messaging()
      .getToken()
      .then((token) => {
        console.log('Got token: ', token);
      });

    // Listen to whether the token changes
    messaging().onTokenRefresh((token) => {
      console.log('Token refreshed: ', token);
    });

    return messaging().onMessage(async (remoteMessage) => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
  }, []);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  return (
    <Provider store={store}>
      <SwitchNavigation />
      <StatusBar
        barStyle="light-content"
        backgroundColor={header_background_color}
      />
    </Provider>
  );
}

export default App;
