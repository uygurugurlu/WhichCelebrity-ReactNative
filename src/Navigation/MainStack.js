import React from 'react';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack'

import HomePage from '../Screens/HomeScreen/HomePage';
import UpdateApp from '../Screens/UpdateAppScreen/UpdateApp';
import { translate } from '../I18n';
import {
  header_background_color,
  header_label_color,
} from '../common/ColorIndex';
import ResultPage from '../Screens/ResultScreen/ResultPage';
import SavingsPage from '../Screens/Savings/SavingsPage';
import Dashboard from '../Screens/Dashboard/Dashboard';
import ResultPage2 from '../Screens/ResultScreen2/ResultPage2';
import HomePage2 from '../Screens/HomeScreen2/HomePage2';
import SignIn from '../Screens/SignIn/SignIn';
import ScoreBoard from '../Screens/ScoreBoard/ScoreBoard';

const MainStack = createStackNavigator();

export default function MainPagesStack() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name={translate('header_label')}
        component={Dashboard}
        options={({ navigation, route }) => ({
          headerShown: true,
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: header_background_color,
          },
          headerTintColor: header_label_color,
          headerTitleStyle: {
            alignSelf: 'center',
          },
        })}
      />
      <MainStack.Screen
        name="Celebrity_Finder_Screen"
        component={HomePage}
        options={({ navigation, route }) => ({
          headerShown: true,
          title: translate('header_label'),
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: header_background_color,
          },
          headerTintColor: header_label_color,

        })}
      />
      <MainStack.Screen
        name="Celebrity_Selection_Screen"
        component={HomePage2}
        options={({ navigation, route }) => ({
          headerShown: true,
          title: translate('header_label'),
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: header_background_color,
          },
          headerTintColor: header_label_color,

        })}
      />
      <MainStack.Screen
        name="ResultPage"
        component={ResultPage}
        options={({ navigation, route }) => ({
          headerShown: false,
          title: translate('header_label'),
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: header_background_color,
          },
          headerTintColor: header_label_color,

        })}
      />
      <MainStack.Screen
        name="ResultPage2"
        component={ResultPage2}
        options={({ navigation, route }) => ({
          headerShown: false,
          title: translate('header_label'),
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: header_background_color,
          },
          headerTintColor: header_label_color,

        })}
      />
      <MainStack.Screen
        name="UpdateApp"
        component={UpdateApp}
        options={({ navigation, route }) => ({
          headerShown: false,
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: header_background_color,
          },
          headerTintColor: header_label_color,

        })}
      />
      <MainStack.Screen
        name="SavingsPage"
        component={SavingsPage}
        options={({ navigation, route }) => ({
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: header_background_color,
          },
          headerTintColor: header_label_color,

        })}
      />
      <MainStack.Screen
        name="SignInPage"
        component={SignIn}
        options={({ navigation, route }) => ({
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: header_background_color,
          },
          headerTintColor: header_label_color,

        })}
      />
      <MainStack.Screen
        name="ScoreBoard"
        component={ScoreBoard}

        options={({ navigation, route }) => ({
          title: translate('scoreboard.scoreboard'),
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: header_background_color,
          },
          headerTintColor: header_label_color,
        })}
      />
    </MainStack.Navigator>
  );
}
