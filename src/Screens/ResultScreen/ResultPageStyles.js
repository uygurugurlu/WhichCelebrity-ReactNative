import {StyleSheet} from 'react-native';
import {DEVICE_WIDTH} from '../../CommonlyUsed/Constants';
import {buttons_height, page_body_background_color} from '../../CommonlyUsed/ColorIndex';

const ICON_CONTAINER_SIZE = DEVICE_WIDTH * 0.95;
const USER_ICON_SIZE = DEVICE_WIDTH * 0.45;

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: page_body_background_color,
  },
  scrollViewStyle: {
    backgroundColor: page_body_background_color,
  },
  viewShotImageStyle: {
    width: '100%',
    height: '100%',
    backgroundColor: page_body_background_color,
  },
  iconContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: ICON_CONTAINER_SIZE,
    height: ICON_CONTAINER_SIZE / 2,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
  },
  labelContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: DEVICE_WIDTH * 0.9,
  },
  resultLabelStyle: {
    fontSize: 18,
    fontWeight: '500',
    fontStyle: 'italic',
  },
  celebrityTextStyle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'orange',
    marginTop: 5,
  },
  iconStyle: {
    width: USER_ICON_SIZE,
    height: USER_ICON_SIZE,
    resizeMode: 'contain'
  },
  buttonsRowContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
  },
  resultButtonStyle: {
    width: DEVICE_WIDTH * 0.38,
    height: buttons_height,
    borderRadius: 10,
    fontWeight: '600',
    backgroundColor: '#123456',
  },
  shareButtonStyle: {
    width: DEVICE_WIDTH * 0.38,
    height: buttons_height,
    borderRadius: 10,
    fontWeight: '600',
    backgroundColor: '#123456',
    marginLeft: DEVICE_WIDTH * 0.05,
  },
  modalTextStyle: {
    fontSize: 18,
    fontWeight: '500',
  },
  line_container_style: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 65,
    width: DEVICE_WIDTH,
  },
  modal_text_style: {
    fontSize: 20,
    marginRight: 25,
    color: '#393636',
  },
  resultLeftTextStyle: {
    width: DEVICE_WIDTH * 0.3,
    fontSize: 18,
    fontWeight: '700',
    color: 'brown',
    textAlign: 'right',
    marginLeft: 7.5
  },
  resultRightTextStyle: {
    width: DEVICE_WIDTH * 0.6,
    fontSize: 18,
    fontWeight: '700',
    color: '#123456',
    textAlign: 'left',
    marginLeft: 7.5
  },
});
