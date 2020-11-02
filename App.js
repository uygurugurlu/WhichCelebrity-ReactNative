import React, { useEffect } from 'react'
import { Provider } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import { Alert, StatusBar } from 'react-native';
import admob, { MaxAdContentRating } from '@react-native-firebase/admob';
import { configureFontAwesomePro } from 'react-native-fontawesome-pro';
import axios from 'axios';
import {
  GoogleSignin,
} from '@react-native-community/google-signin';
import { header_background_color } from './src/common/ColorIndex';
import { setI18nConfig, translate } from './src/I18n'
import SwitchNavigation from './src/Navigation/SwitchNavigation';
import configureStore from './src/Store/ConfigureStore';
import { getUniqueId } from 'react-native-device-info';
import {
  TourGuideProvider, // Main provider

} from 'rn-tourguide'
import { DeviceToken } from './src/common/Functions/Endpoints/DeviceToken'
import { getData, storeStringData } from './src/common/Functions/ManageAsyncData'
configureFontAwesomePro();
const store = configureStore();
function App() {
  console.log("unique id: ",getUniqueId());
  GoogleSignin.configure({
    webClientId:
      '93591380261-076oe651jsdnrr01kol349k11s8eh0hq.apps.googleusercontent.com',
    offlineAccess: true,
  });
  const init = async () => {
    await AdMobConfigure();
    await setI18nConfig();

  };

  const AxiosInterceptors = () => {
    /** Print Every Response to the Console */
    axios.interceptors.response.use(
      (res) => {
        console.log('interceptor response',res);
        // console.log('status is:' + status);
        // console.table(data);
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
        config.params = { ...config.params, locale: 'tr' };
        console.log('interceptor request');
       /* console.table(config);
        console.groupEnd();*/
        return config;
      },
      (error) => Promise.reject(error),
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

  /** FCM Token */
  useEffect( () => {
    init().finally(() => {
      AxiosInterceptors();
    });
    const handleDeviceToken = async () => {
      let FcmToken = await getData('@FCMToken')
      if(FcmToken === null){
        console.log("Token not found, getting a new one");
        messaging()
          .getToken()
          .then( async (token) => {
            console.log('Got token: ', token);
            let deviceTokenRes = await DeviceToken(getUniqueId(), token);
            console.log("Device Token Response: ",deviceTokenRes);
            await storeStringData('@FCMToken', token);
          });
      }
    }
    handleDeviceToken();
    // Listen to whether the token changes
    messaging().onTokenRefresh(async (token) => {
      console.log('Token refreshed: ', token);
      let deviceTokenRes = await DeviceToken(getUniqueId(), token);
      console.log("Device Token Response: ",deviceTokenRes);
      await storeStringData('@FCMToken', token);
    });

    return messaging().onMessage(async (remoteMessage) => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
  }, []);



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
