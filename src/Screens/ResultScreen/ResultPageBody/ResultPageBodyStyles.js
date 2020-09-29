import {StyleSheet} from 'react-native';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../../common/Constants';
import {
  buttons_height,
  page_body_background_color,
} from '../../../common/ColorIndex';

const ICON_CONTAINER_SIZE = DEVICE_WIDTH * 0.95;
const USER_ICON_SIZE = DEVICE_WIDTH * 0.45;

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 30,
    borderColor: 'rgb(150,150,150)',
    borderWidth: 3,
    overflow: 'hidden',
    margin: 10,
  },
  imageBack: {
    flex: 1,
    resizeMode:"cover",
    borderRadius: 20,
  },
  scrollViewStyle: {
    
  },
  viewShotImageStyle: {
    flex: 1,
  },
  imagesContainer: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 0,
  },
  imagesWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  imageWrap: {
    backgroundColor: 'white',
    borderRadius: 100,
    overflow: 'hidden',
  },
  cameraImage: {
    resizeMode: 'contain',
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    height: 200,
    width: 200,
  },
  iconContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: ICON_CONTAINER_SIZE,
    height: ICON_CONTAINER_SIZE / 2,
    paddingHorizontal: 5,
    marginTop: 10,
  },
  labelContainerStyle: {
    flexDirection: 'column',
    flex: 1,
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
  titleTextStyle: {
    fontWeight: '500',
    fontSize: 17,
    marginTop: 15,
    // marginHorizontal:10,
    alignSelf: 'center',
  },
});
