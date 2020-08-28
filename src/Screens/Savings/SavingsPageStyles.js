import {StyleSheet} from 'react-native';
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
} from '../../common/Constants';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: DEVICE_WIDTH,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    paddingTop: 7.5,
  },
  buttonsRowStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT * 0.085,
    backgroundColor: '#123456',
    paddingVertical: 5,
  },
  buttonStyle: {
    marginHorizontal: DEVICE_WIDTH * 0.05,
    width: DEVICE_WIDTH * 0.35,
    backgroundColor: 'white',
  },
  buttonTitleStyle: {
    backgroundColor: '#fff',
    color: '#123456',
    fontWeight: '600',
  },
  buttonContainerStyle: {
    backgroundColor: '#123456',
  },
});
