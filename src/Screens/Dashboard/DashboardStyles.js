import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
} from '../../common/Constants';
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
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: DEVICE_HEIGHT * 0.025,
    backgroundColor: 'white',
  },
  bottomContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: DEVICE_HEIGHT * 0.025,
    backgroundColor: 'white',
  },
  imageStyle: {
    height: '100%',
    width: '100%',
    resizeMode: 'stretch'
  },
  textStyle: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    color: '#4b4949',
    padding: 7.5,
    width: DEVICE_WIDTH * 0.8,
  },
});
