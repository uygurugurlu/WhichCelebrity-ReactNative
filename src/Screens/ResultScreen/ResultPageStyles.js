import {StyleSheet} from 'react-native';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../common/Constants';
import {
  buttons_height,
  page_body_background_color,
} from '../../common/ColorIndex';

const ICON_CONTAINER_SIZE = DEVICE_WIDTH * 0.95;
const USER_ICON_SIZE = DEVICE_WIDTH * 0.45;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBack: {
    flex: 1,
    resizeMode: 'contain',
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  scrollViewStyle: {},
  viewShotImageStyle: {
    width: '100%',
    height: '100%',
  },
  swiperContainer: {
    flex: 0.9,
  },
  bottomContainer: {
    flex: 0.1,
    justifyContent: 'center',
  },
  iconContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: ICON_CONTAINER_SIZE,
    height: ICON_CONTAINER_SIZE / 2,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    marginTop: 10,
  },
  labelContainerStyle: {
    flexDirection: 'column',
    width: DEVICE_WIDTH * 0.9,
    height: DEVICE_HEIGHT * 0.275,
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
    resizeMode: 'contain',
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
  graveIconStyle: {
    height: 30,
    width: 30,
    marginLeft: 5,
  },
  // Category Modal Styles
  modalBack: {
    backgroundColor: '#00000080',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomModal: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  settingsModalContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: DEVICE_WIDTH - 20,
    backgroundColor: 'rgb(240,240,240)',
    borderRadius: 15,
  },
  settingsMainButtons: {
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    width: DEVICE_WIDTH - 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(100,100,100)',
    flexDirection: 'row',
  },
  settingsButton: {
    textAlign: 'center',
    color: '#1a84f4',
    fontSize: 19,
  },
  cancelButtonContainer: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    height: 50,
    justifyContent: 'center',
    width: DEVICE_WIDTH - 20,
    borderRadius: 15,
    backgroundColor: 'rgb(240,240,240)',
  },
  cancelButton: {
    textAlign: 'center',
    color: 'red',
    fontSize: 19,
  },
});
