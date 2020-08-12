import React, {Component} from 'react';
import {Alert, StyleSheet, Linking, View, Platform} from "react-native";
import {DEVICE_HEIGHT, DEVICE_WIDTH} from "../../CommonlyUsed/CommonlyUsedConstants";

class UpdateApp extends Component {

    componentWillMount() {
        Alert.alert(
            'Uygulama güncel değil',
            'Lütfen devam etmeden önce "Hık Demiş" uygulamasını güncelleyiniz.',
            [
                {
                    text: 'Güncelle',
                    onPress: () => this.Update()
                },
            ],
            {cancelable: false}
        );
    }

    Update = () => {
        console.log("Update pressed");
        Platform.OS === "android" ?
            Linking.openURL('market://details?id=90728571327')
            :
            Linking.openURL('itms-apps://itunes.apple.com/us/app/apple-store/1524011545?mt=8')
    }

    render() {
        return (
            <View>
            </View>
        );
    }
}

export const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: DEVICE_WIDTH,
        height: DEVICE_HEIGHT,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#123456"
    },
});

export default UpdateApp;
