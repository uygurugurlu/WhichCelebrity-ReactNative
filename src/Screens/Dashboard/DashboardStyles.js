import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
} from '../../CommonlyUsed/CommonlyUsedConstants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  topContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: DEVICE_WIDTH * 0.8,
    height: DEVICE_HEIGHT * 0.4,
    marginTop: DEVICE_HEIGHT * 0.05,
    marginHorizontal: DEVICE_WIDTH * 0.05,
    backgroundColor: 'orange',
  },
  bottomContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: DEVICE_WIDTH * 0.8,
    height: DEVICE_HEIGHT * 0.4,
    marginTop: DEVICE_HEIGHT * 0.05,
    backgroundColor: 'orange',
  },
  textStyle: {
    fontSize: 25,
    fontWeight: '500',
    marginHorizontal: DEVICE_WIDTH * 0.05,
    textAlign: 'center',
    color: '#4b4949',
  },
});
