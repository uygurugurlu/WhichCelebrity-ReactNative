import React, {Component} from 'react';
import {Alert, StyleSheet, Linking, View, Platform} from 'react-native';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../common/Constants';
import {translate} from '../../I18n';

class UpdateApp extends Component {
  componentWillMount() {
    Alert.alert(
      translate('update.not_up_to_date'),
      translate('update.update_the_app'),
      [
        {
          text: translate('update.update'),
          onPress: () => this.Update(),
        },
      ],
      {cancelable: false},
    );
  }

  Update = () => {
    Platform.OS === 'android'
      ? Linking.openURL('market://details?id=com.looklikecelebrity')
      : Linking.openURL(
          'itms-apps://itunes.apple.com/us/app/apple-store/1524011545?mt=8',
        );
  };

  render() {
    return <View />;
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
    backgroundColor: '#123456',
  },
});

export default UpdateApp;
