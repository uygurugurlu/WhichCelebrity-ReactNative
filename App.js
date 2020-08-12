import React, {useEffect} from "react";
import configureStore from './src/Store/ConfigureStore';
import {Provider} from 'react-redux';
import SwitchNavigation from './src/Navigation/SwitchNavigation';
import {setI18nConfig} from "./src/I18n";
import messaging from '@react-native-firebase/messaging';
import {Alert, BackHandler, Linking, StatusBar} from 'react-native';
import admob, {MaxAdContentRating} from '@react-native-firebase/admob';
import {configureFontAwesomePro} from "react-native-fontawesome-pro";

configureFontAwesomePro();
const store = configureStore();

function App() {
    let init = async () => {
        await requestUserPermission();
        await AdMobConfigure();
        await setI18nConfig();
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
        });

        messaging().getToken().then(token => {
            console.log('Got token: ', token);
        });

        // Listen to whether the token changes
        messaging().onTokenRefresh(token => {
            console.log('Token refreshed: ', token);
        });

        return messaging().onMessage(async remoteMessage => {
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
            <SwitchNavigation/>
            <StatusBar barStyle="light-content"/>
        </Provider>
    );
}

export default App;
