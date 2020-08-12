import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import WebViewPage from "../../Screens/WebViewScreen/WebViewPage";
import UpdateApp from "../../Screens/UpdateAppScreen/UpdateApp";
import LandingSlides from "../../Screens/LandingSlides/LandingSlides";

const NavigationStack = createStackNavigator();

export default function StarterPagesStack() {
    return (
        <NavigationStack.Navigator>
            <NavigationStack.Screen name="LandingSlides"
                                    component={LandingSlides}
                                    options={({navigation, route}) => ({
                                        headerShown: false,
                                        headerBackTitleVisible: false,
                                    })}/>
            <NavigationStack.Screen name="WebViewPage"
                                    component={WebViewPage}
                                    options={({navigation, route}) => ({
                                        headerBackTitleVisible: false,
                                        title: ""
                                    })}/>
            <NavigationStack.Screen name="UpdateApp"
                                    component={UpdateApp}
                                    options={({navigation, route}) => ({
                                        headerShown: false,
                                        headerBackTitleVisible: false,
                                    })}/>
        </NavigationStack.Navigator>
    );
}
