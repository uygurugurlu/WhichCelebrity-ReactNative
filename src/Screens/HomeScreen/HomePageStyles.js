import { StyleSheet } from 'react-native';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../common/Constants';
import {
  buttons_height,
  button_colors,
  page_body_background_color,
  blue_text_color,
} from '../../common/ColorIndex';

const ICON_CONTAINER_SIZE = DEVICE_WIDTH * 0.4;
const MOTHER_ICON_SIZE = DEVICE_WIDTH * 0.35;

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 6,
    backgroundColor: 'rgb(50,50,50)',
  },
  imageBack: {
    flex: 1,
    resizeMode: 'cover',
  },
  topLabelContainerStyle: {
    flex: 2.5,
    justifyContent: 'space-evenly',
    alignItems: 'center',

  },
  selectCategoryContainer: {
    height: 40,
    justifyContent: 'center',
    width: DEVICE_WIDTH - 60,
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: 'rgb(240,240,240)',
  },
  selectCategoryText: {
    flexDirection: 'row',
    flex: 0.8,
    color: '#284077',
    textAlign: 'center',
    fontWeight: '700',
  },
  selectCategoryWrapper: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    flex: 2.5,
    justifyContent: 'center',
  },
  cameraImageContainer: {
    alignSelf: 'center',
    height: 200,
    width: 200,
    backgroundColor: 'red',
    borderRadius: 1000,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  cameraImage: {
    height: 200,
    width: 200,
    resizeMode: 'cover',
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  cameraWrapper: {
    height: 199,
    width: 199,
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    borderRadius: 1000,
    overflow: 'hidden',
  },
  cameraIcon: {
    height: 190,
    width: 190,
    resizeMode: 'cover',
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  cameraButton: {
    alignSelf: 'center',
    height: 190,
    width: 190,
    borderRadius: 1000,
    margin: 30,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  headerRightButtonStyle: {
    height: 35,
    width: 35,
    marginRight: 15,
  },
  topLabelStyle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    height: 40,
    justifyContent: 'center',
    width: DEVICE_WIDTH - 60,
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: button_colors,
  },
  buttonText: {
    color: 'white',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: '800',
  },
  // Options Modal Styles
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
    backgroundColor: '#00000080',
  },
  modalContainer: {
    backgroundColor: 'rgb(245,245,245)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeader: {
    height: 55,
    backgroundColor: '#284077',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    flex: 10,
    justifyContent: 'center',
  },
  modalHeaderTitle: {
    flex: 8,
    color: 'white',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingLeft: 40,
    textAlign: 'center',
  },
  ModalCloseButton: {
    alignSelf: 'center',
    paddingHorizontal: 10,
  },
  modalItem: {
    borderBottomWidth: 0.5,
    borderColor: 'rgb(150,150,150)',
  },
  categoryListContainer: {
    height: Math.round(DEVICE_HEIGHT) * 0.5,
    marginBottom: 30,
  },
  categoryListContainerNoHeight: {
    marginBottom: 30,
  },
  categoriesListText: {
    textAlign: 'center',
    paddingVertical: 10,
  },

  cropView: {
    flex: 5,
  },
  cropButtonsContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  cropButtonContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cropWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cropButtons: {
    height: 70,
    width: 70,
  }

  /// /////////////////////////
  /*
  topLabel2ContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: DEVICE_WIDTH * 0.9,
  },
  labelsContainerStyle: {
    backgroundColor:'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: DEVICE_HEIGHT * 0.025,
  },
  headerTextStyle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
    color: '#123456',
  },
  topLabelStyle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  topLabel2Style: {
    color: '#123456',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'left',
    width: DEVICE_WIDTH * 0.7 - 5,
    height: DEVICE_HEIGHT * 0.071,
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
    height: DEVICE_HEIGHT * 0.075,
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
  cancelIconContainerStyle: {
    alignSelf: 'center',
    backgroundColor: 'gray',
    borderRadius: 12.5,
  },
  headerRightButtonStyle: {
    height: 35,
    width: 35,
    marginRight: 15,
  },
  */
});
