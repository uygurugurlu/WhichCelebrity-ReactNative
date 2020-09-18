import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';

import HomePage from '../Screens/HomeScreen/HomePage';
import UpdateApp from '../Screens/UpdateAppScreen/UpdateApp';
import {translate} from '../I18n';
import {
  header_background_color,
  header_label_color,
} from '../common/ColorIndex';
import ResultPage from '../Screens/ResultScreen/ResultPage';
import SavingsPage from '../Screens/Savings/SavingsPage';
import Dashboard from '../Screens/Dashboard/Dashboard';
import ResultPage2 from '../Screens/ResultScreen2/ResultPage2';
import HomePage2 from '../Screens/HomeScreen2/HomePage2';

const MainStack = createStackNavigator();

export default function MainPagesStack() {
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={async (state) => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = getActiveRouteName(state);

        if (previousRouteName !== currentRouteName) {
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
      }}>
      <MainStack.Navigator>
        <MainStack.Screen
          name={'Dashboard'}
          component={Dashboard}
          options={({navigation, route}) => ({
            headerShown: false,
            headerBackTitleVisible: false,
            headerStyle: {
              backgroundColor: header_background_color,
            },
            headerTintColor: header_label_color,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        />
        <MainStack.Screen
          name={'Celebrity_Finder_Screen'}
          component={HomePage}
          options={({navigation, route}) => ({
            headerShown: true,
            title: translate('header_label'),
            headerBackTitleVisible: false,
            headerStyle: {
              backgroundColor: header_background_color,
            },
            headerTintColor: header_label_color,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        />
        <MainStack.Screen
          name={'Celebrity_Selection_Screen'}
          component={HomePage2}
          options={({navigation, route}) => ({
            headerShown: true,
            title: translate('header_label'),
            headerBackTitleVisible: false,
            headerStyle: {
              backgroundColor: header_background_color,
            },
            headerTintColor: header_label_color,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        />
        <MainStack.Screen
          name="ResultPage"
          component={ResultPage}
          options={({navigation, route}) => ({
            headerShown: true,
            title: translate('header_label'),
            headerBackTitleVisible: false,
            headerStyle: {
              backgroundColor: header_background_color,
            },
            headerTintColor: header_label_color,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        />
        <MainStack.Screen
          name="ResultPage2"
          component={ResultPage2}
          options={({navigation, route}) => ({
            headerShown: true,
            title: translate('header_label'),
            headerBackTitleVisible: false,
            headerStyle: {
              backgroundColor: header_background_color,
            },
            headerTintColor: header_label_color,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        />
        <MainStack.Screen
          name="UpdateApp"
          component={UpdateApp}
          options={({navigation, route}) => ({
            headerShown: false,
            headerBackTitleVisible: false,
            headerStyle: {
              backgroundColor: header_background_color,
            },
            headerTintColor: header_label_color,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        />
        <MainStack.Screen
          name="SavingsPage"
          component={SavingsPage}
          options={({navigation, route}) => ({
            headerBackTitleVisible: false,
            headerStyle: {
              backgroundColor: header_background_color,
            },
            headerTintColor: header_label_color,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
