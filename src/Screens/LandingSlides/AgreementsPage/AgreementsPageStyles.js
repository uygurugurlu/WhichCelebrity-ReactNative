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
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    //marginVertical: 5,
  },
  kvkkColumnContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    //alignItems: 'center',
    width: DEVICE_WIDTH * 0.7,
    backgroundColor: '#fff',
    marginVertical: 10,
    marginLeft: DEVICE_WIDTH * 0.1,
    marginRight: 5,
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
    height: DEVICE_WIDTH * 0.35,
    width: DEVICE_WIDTH * 0.35 * 1.18241042345,
  },
  dotImageStyle: {
    height: 20,
    width: 20,
    marginRight: 10,
    marginTop: 5,
  },
  checkBoxImageStyle: {
    height: 20,
    width: 20,
    marginTop: 5,
  },
  titleTextStyle: {
    fontSize: 20,
    fontWeight: '600',
    alignSelf: 'center'
  },
  textStyle: {
    fontSize: 17,
    fontWeight: '500',
    color: 'rgba(0,0,0,0.85)',
    marginLeft: DEVICE_WIDTH * 0.05,
    width: DEVICE_WIDTH * 0.8,
    marginVertical: DEVICE_HEIGHT * 0.05
  },
  linkTextStyle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(5,76,147,0.87)',
  },
  getPermissionButtonStyle: {
    width: DEVICE_WIDTH * 0.92,
    borderRadius: 7.5,
    height: buttons_height,
    backgroundColor: '#0177C9',
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
