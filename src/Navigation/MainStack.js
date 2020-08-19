import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import HomePage from "../Screens/HomeScreen/HomePage";
import UpdateApp from "../Screens/UpdateAppScreen/UpdateApp";
import {translate} from "../I18n";
import {header_background_color, header_label_color} from "../CommonlyUsed/ColorIndex";
import ResultPage from "../Screens/ResultScreen/ResultPage";
import SavingsPage from "../Screens/Savings/SavingsPage";
import Dashboard from "../Screens/Dashboard/Dashboard";
import ResultPage2 from "../Screens/ResultScreen2/ResultPage2";
import HomePage2 from "../Screens/HomeScreen2/HomePage2";

const MainStack = createStackNavigator();

export default function MainPagesStack() {
    return (
        <MainStack.Navigator>
            <MainStack.Screen name={"Dashboard"}
                              component={Dashboard}
                              options={({navigation, route}) => ({
                                  headerShown: false,
                                  headerBackTitleVisible: false,
                                  headerStyle: {
                                      backgroundColor: header_background_color
                                  },
                                  headerTintColor: header_label_color,
                                  headerTitleStyle: {
                                      fontWeight: 'bold',
                                  },
                              })}/>
            <MainStack.Screen name={"HomePage"}
                              component={HomePage}
                              options={({navigation, route}) => ({
                                  headerShown: true,
                                  headerBackTitleVisible: false,
                                  headerStyle: {
                                      backgroundColor: header_background_color
                                  },
                                  headerTintColor: header_label_color,
                                  headerTitleStyle: {
                                      fontWeight: 'bold',
                                  },
                              })}/>
            <MainStack.Screen name={"HomePage2"}
                              component={HomePage2}
                              options={({navigation, route}) => ({
                                  headerShown: true,
                                  headerBackTitleVisible: false,
                                  headerStyle: {
                                      backgroundColor: header_background_color
                                  },
                                  headerTintColor: header_label_color,
                                  headerTitleStyle: {
                                      fontWeight: 'bold',
                                  },
                              })}/>
            <MainStack.Screen name="ResultPage"
                              component={ResultPage}
                              options={({navigation, route}) => ({
                                  headerShown: true,
                                  title: translate('app_name'),
                                  headerBackTitleVisible: false,
                                  headerStyle: {
                                      backgroundColor: header_background_color
                                  },
                                  headerTintColor: header_label_color,
                                  headerTitleStyle: {
                                      fontWeight: 'bold',
                                  },
                              })}/>
            <MainStack.Screen name="ResultPage2"
                              component={ResultPage2}
                              options={({navigation, route}) => ({
                                  headerShown: true,
                                  title: translate('app_name'),
                                  headerBackTitleVisible: false,
                                  headerStyle: {
                                      backgroundColor: header_background_color
                                  },
                                  headerTintColor: header_label_color,
                                  headerTitleStyle: {
                                      fontWeight: 'bold',
                                  },
                              })}/>
            <MainStack.Screen name="UpdateApp"
                              component={UpdateApp}
                              options={({navigation, route}) => ({
                                  headerShown: false,
                                  headerBackTitleVisible: false,
                                  headerStyle: {
                                      backgroundColor: header_background_color
                                  },
                                  headerTintColor: header_label_color,
                                  headerTitleStyle: {
                                      fontWeight: 'bold',
                                  },
                              })}/>
            <MainStack.Screen name="SavingsPage"
                              component={SavingsPage}
                              options={({navigation, route}) => ({
                                  headerBackTitleVisible: false,
                                  headerStyle: {
                                      backgroundColor: header_background_color
                                  },
                                  headerTintColor: header_label_color,
                                  headerTitleStyle: {
                                      fontWeight: 'bold',
                                  },
                              })}/>
        </MainStack.Navigator>
    );
}
