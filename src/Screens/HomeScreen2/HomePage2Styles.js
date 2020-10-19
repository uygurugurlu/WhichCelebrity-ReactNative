import { StyleSheet, Dimensions } from 'react-native';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../common/Constants';
import {
  buttons_height,
  button_colors,
  page_body_background_color,
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
  topLabelStyle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginHorizontal: 30,
  },
  cameraContainer: {
    flex: 2.5,
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
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
  celebritySelectedContainer: {
    height: 100,
    justifyContent: 'center',
    width: DEVICE_WIDTH - 60,
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: 'rgb(240,240,240)',
  },
  celebritySelectedPressContainer: {
    height: 40,
    width: DEVICE_WIDTH - 60,
    alignSelf: 'center',
  },
  celebritySelectedPress: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(180,180,180)',
  },
  celebritySelectedRow: {
    flexDirection: 'row',
    height: 60,
  },
  celebritySelectedImageContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  celebritySelectedImageWrapper: {
    margin: 3,
    flex: 1,
    overflow: 'hidden',
    aspectRatio: 1,
    borderRadius: 100,
  },
  celebritySelectedImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  celebritySelectedName: {
    flex: 0.5,
    justifyContent: 'center',
  },
  celebritySelectedNameText: {
    color: '#284077',
    fontWeight: '700',
  },
  selectedCelebrityCancel: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelsContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  topLabel2Style: {
    color: '#123456',
    fontSize: 15,
    fontWeight: '500',
    marginTop: 7.5,
    textAlign: 'center',
  },
  tooltipTextStyle: {
    color: '#123456',
    fontSize: 15,
    fontWeight: '500',
    marginTop: 5,
    textAlign: 'center',
  },
  selectedLabelTextStyle: {
    color: '#123456',
    fontSize: 17,
    fontWeight: '500',
    marginTop: 7.5,
    textAlign: 'center',
  },
  selectedCelebrityTextStyle: {
    color: 'red',
    fontSize: 19,
    fontWeight: '600',
    marginTop: 7.5,
    textAlign: 'center',
  },
  resultButtonStyle: {
    width: DEVICE_WIDTH * 0.4,
    height: buttons_height,
    borderRadius: 2.5,
    fontWeight: '600',
    backgroundColor: button_colors,
    marginBottom: 25,
    borderRadius: 20,
  },
  randomButtonStyle: {
    width: DEVICE_WIDTH * 0.4,
    height: buttons_height,
    borderRadius: 2.5,
    fontWeight: '600',
    backgroundColor: button_colors,
    marginBottom: 25,
    borderRadius: 20,
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
    width: DEVICE_WIDTH * 0.95,
    backgroundColor: page_body_background_color,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  scrollTextStyle: {
    fontSize: 17,
    fontWeight: '600',
  },
  scrollItemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: DEVICE_WIDTH * 0.95,
    paddingVertical: 10,

    borderTopWidth: 0.75,
    borderLeftWidth: 1.2,
    borderRightWidth: 1.2,
    borderColor: '#dedddd',
  },
  celebrityPhotoStyle: {
    height: 70,
    width: 70,
    borderRadius: 1,
    resizeMode: 'contain',
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
  // celebrities style
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
    height: Math.round(Dimensions.get('window').height) * 0.5,
    marginBottom: 30,
  },
  categoryListContainerNoHeight: {
    marginBottom: 30,
  },
  categoriesListText: {
    textAlign: 'center',
    marginHorizontal: 10,
  },
  modalItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalImageContainer: {
    height: 50,
    width: 50,
    borderRadius: 100,
    overflow: 'hidden',
    marginLeft: 10,
  },
  modalImage: {
    height: 50,
    width: 50,
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
  },
});
