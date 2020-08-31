import {StyleSheet} from 'react-native';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../common/Constants';
import {buttons_height, button_colors, page_body_background_color} from '../../common/ColorIndex';

const ICON_CONTAINER_SIZE = DEVICE_WIDTH * 0.4;
const MOTHER_ICON_SIZE = DEVICE_WIDTH * 0.35;

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: page_body_background_color,
  },
  topLabelContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: DEVICE_WIDTH * 0.9,
    marginBottom: 10,
  },
  topLabel2ContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: DEVICE_WIDTH * 0.9,
    marginTop: DEVICE_HEIGHT * 0.05
  },
  labelsContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: DEVICE_HEIGHT * 0.025,
  },
  headerTextStyle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
    color: "#123456"
  },
  topLabelStyle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 10,
    borderRadius: 5,
  },
  topLabel2Style: {
    color: '#123456',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  topLabelSelectedStyle: {
    color: '#123456',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  categoryContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: DEVICE_WIDTH * 0.8,
    padding: 10,
    borderWidth: 0.5,
    borderColor: '#dedede',

    backgroundColor: '#fff',
  },
  resultButtonStyle: {
    width: DEVICE_WIDTH * 0.8,
    height: buttons_height,
    borderRadius: 5,
    fontWeight: '600',
    backgroundColor: button_colors,
    marginBottom: 25,
  },
  cancelButtonStyle: {
    width: DEVICE_WIDTH * 0.8,
    height: buttons_height,
    borderRadius: 5,
    fontWeight: '600',
    backgroundColor: button_colors,
    marginVertical: 20,
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
  backgroundImage: {
    flex: 1,
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    resizeMode: 'cover', // or 'stretch'
  },
  iconsMainContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  iconContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: ICON_CONTAINER_SIZE,
    height: ICON_CONTAINER_SIZE,
    borderRadius: ICON_CONTAINER_SIZE / 2,
    backgroundColor: '#fff',
  },
  iconStyle: {
    width: MOTHER_ICON_SIZE,
    height: MOTHER_ICON_SIZE,

    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  iconTextStyle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#123456',
    marginTop: 5,
  },
  iconWrapperStyle: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  backgroundImageStyle: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#f5bc1a',
  },
  scrollViewStyle: {
    width: DEVICE_WIDTH * 0.9 + 15,
    backgroundColor: page_body_background_color,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  scrollTextStyle: {
    fontSize: 18,
    fontWeight: '500',
  },
  scrollTextContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: DEVICE_WIDTH * 0.8,

    borderTopWidth: 0.45,
    borderLeftWidth: 0.45,
    borderRightWidth: 0.45,
    borderColor: '#dedede',
    padding: 10,
  },
});
