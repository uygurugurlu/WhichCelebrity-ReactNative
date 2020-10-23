import { StyleSheet, View } from 'react-native';
import React from 'react';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../common/Constants';
import { yellow_text_color } from '../../common/ColorIndex'

export const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  scoreBoardContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 30,
  },
  scoreBoardWrapper: {
    backgroundColor: yellow_text_color,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreBoardFullWidth: {
    flex: 1,
    marginVertical: 6,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  scoreBoard: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 10,
  },
  scoreBoardIcon: {
  },
  cardContainer: {
    flex: 1,
  },
  imageStyle: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined,
    margin: 10,
    resizeMode: 'contain',
  },
  textStyle: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    color: '#4b4949',
    padding: 7.5,
    width: DEVICE_WIDTH * 0.65,
  },
  container: {
    flex: 1,
  },
  imageBack: {
    flex: 1,
    resizeMode: 'cover',
  },
  title: {
    textAlign: 'center',
    color: 'white',
    marginHorizontal: 10,
    marginTop: 5,
    fontSize: 15,
    fontWeight: '800',
  },
});
