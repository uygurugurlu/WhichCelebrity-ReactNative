import {StyleSheet} from 'react-native';
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
} from '../../../common/Constants';
import {buttons_height} from '../../../common/ColorIndex';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#dddddd',
  },
  imageStyle: {
    marginTop: DEVICE_HEIGHT * 0.05,
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.75,
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
