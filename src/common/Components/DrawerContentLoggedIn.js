import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  Image,
  TouchableHighlight,
} from 'react-native';
import {translate} from '../../I18n';
import {GoogleSigninButton} from '@react-native-community/google-signin';
import {CAMERAICON, DEVICE_HEIGHT} from '../Constants';

export const CustomDrawerContentLoggedIn = ({isLoggedIn}) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatarWrapper}>
          <Image source={CAMERAICON} style={styles.avatarImage} />
        </View>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.signInButtonContainer}>
          <Text style={styles.title}>Selam</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(70,70,70)',
  },
  avatarContainer: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarWrapper: {
    flex: 0.8,
    borderRadius: 100,
    aspectRatio: 1,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 20,
  },
  contentContainer: {
    flex: 0.6,
  },
  signInButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})