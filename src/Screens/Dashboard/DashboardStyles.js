import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
} from '../../common/Constants';
import {Image, StyleSheet} from 'react-native';
import React from "react";

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  topContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: DEVICE_HEIGHT * 0.0125,
    backgroundColor: 'white',
  },
  bottomContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: DEVICE_HEIGHT * 0.0125,
    backgroundColor: '#fff',
  },
  imageStyle: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined,
    margin: 10,
    resizeMode: 'contain'
  },
  textStyle: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    color: '#4b4949',
    padding: 7.5,
    width: DEVICE_WIDTH * 0.65,
  },
});
