import { StyleSheet } from 'react-native';
import React from 'react';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../common/Constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  imageBack: {
    flex: 1,
    resizeMode: 'cover',
  },
  topLabelContainerStyle: {
    flex: 0.1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  topLabelStyle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  selectCelebrityContainer: {
    flex: 0.2,
    justifyContent: 'center',

  },
  boardContainer: {
    flex: 0.8,
    marginHorizontal: 10,
    overflow: 'hidden',

  },
  topRanksContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(100,100,100)'
  },
  myRankContainer: {
    flex: 0.25,
  },
  myRankWrapper: {
    height: DEVICE_HEIGHT * 0.12 + 10,

  }
});
