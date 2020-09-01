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
    width: DEVICE_WIDTH * 0.65,
    // height: DEVICE_HEIGHT * 0.4,
    // paddingVertical: 7.5,
    marginTop: DEVICE_HEIGHT * 0.05,
    backgroundColor: 'white',
  },
  bottomContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: DEVICE_WIDTH * 0.65,
    //height: DEVICE_HEIGHT * 0.4,
    marginTop: DEVICE_HEIGHT * 0.025,
    backgroundColor: 'white',
    //paddingVertical: 7.5,
  },
  imageStyle: {
    height: DEVICE_WIDTH * 0.6,
    width: DEVICE_WIDTH * 0.65
  },
  textStyle: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    color: '#4b4949',
    margin: 7.5,
  },
});
