import {StyleSheet} from 'react-native';
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
} from '../../../CommonlyUsed/Constants';
import {buttons_height} from '../../../CommonlyUsed/ColorIndex';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dddddd',
  },
  imageStyle: {
    marginTop: DEVICE_HEIGHT * 0.05,
    marginHorizontal: DEVICE_WIDTH * 0.02,
  },
  cancelButtonStyle: {
    height: buttons_height,
    width: DEVICE_WIDTH * 0.35,
    marginHorizontal: 5,

    borderRadius: 5,
    fontWeight: '600',
    backgroundColor: '#123456',
    marginLeft: DEVICE_WIDTH * 0.05,
  },
  cancelButtonTitleStyle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  shareButtonStyle: {
    height: buttons_height,
    width: DEVICE_WIDTH * 0.35,
    marginHorizontal: 5,

    borderRadius: 5,
    fontWeight: '600',
    backgroundColor: '#123456',
    marginLeft: DEVICE_WIDTH * 0.05,
  },
  shareButtonTitleStyle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  buttonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 25,
  },
});
