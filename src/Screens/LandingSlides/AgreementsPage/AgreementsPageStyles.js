import {StyleSheet} from 'react-native';
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
} from '../../../common/Constants';
import {buttons_height} from '../../../common/ColorIndex';

export const styles = StyleSheet.create({
  mainContainerStyle: {
    height: '85%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  containerStyle: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: DEVICE_WIDTH,
    backgroundColor: '#fff',
  },
  titleRowContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: DEVICE_WIDTH * 0.9,
    backgroundColor: '#fff',
    marginVertical: 15,
  },
  rowContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: DEVICE_WIDTH * 0.7,
    backgroundColor: '#fff',
    marginVertical: 15,
    marginHorizontal: DEVICE_WIDTH * 0.05,
  },
  kvkkRowContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 5,
    width: DEVICE_WIDTH * 0.85
  },
  kvkkColumnContainerStyle: {
    backgroundColor: '#fff',
    marginVertical: 10,
  },
  kvkkTextStyle: {
    fontSize: 15,
    fontWeight: '400',
    color: 'rgba(0,0,0,0.85)',
  },
  bottomContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imageStyle: {
    height: DEVICE_WIDTH * 0.4,
    width: DEVICE_WIDTH * 0.4 * 1.18241042345,
  },
  dotImageStyle: {
    height: 20,
    width: 20,
    marginRight: 10,
    marginTop: 5,
  },
  checkBoxStyle: {
    height: 25,
    width: 25,
    marginHorizontal: 10
  },
  titleTextStyle: {
    fontSize: 24,
    fontWeight: '600',
    alignSelf: 'center',
    color: '#1b1b1b'
  },
  textStyle: {
    fontSize: 19,
    fontWeight: '600',
    textAlign: 'center',
    color: 'rgba(0,0,0,0.60)',
    marginLeft: DEVICE_WIDTH * 0.05,
    width: DEVICE_WIDTH * 0.85,
    marginVertical: DEVICE_HEIGHT * 0.025
  },
  linkTextStyle: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(5,76,147,0.87)',
  },
  acceptTextStyle: {
    fontSize: 13,
    fontWeight: '500',
    width: DEVICE_WIDTH * 0.75,
    color: "#000"
  },
  getPermissionButtonStyle: {
    width: DEVICE_WIDTH * 0.9,
    borderRadius: 7.5,
    height: buttons_height,
    backgroundColor: '#0177C9',
    marginVertical: 15
  },
  getPermissionButtonTittleStyle: {
    fontSize: 18,
    fontWeight: '600',
  },
  laterTextStyle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0177C9',
  },
});
