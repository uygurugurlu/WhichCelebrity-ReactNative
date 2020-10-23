import { StyleSheet } from 'react-native';
import { DEVICE_WIDTH } from '../common/Constants';
import { button_colors, header_background_color, yellow_text_color } from '../common/ColorIndex'

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'rgb(70,70,70)',
  },
  avatarContainer: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarWrapper: {
    flex: 0.6,
    borderRadius: 100,
    aspectRatio: 1,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    resizeMode: 'cover',
    height: DEVICE_WIDTH * 0.6,
    width: DEVICE_WIDTH * 0.6,
  },
  title: {
    color: 'white',
    fontSize: 20,
  },
  contentContainer: {
    flex: 0.6,
    justifyContent: 'space-between',
  },
  signInButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutContainer: {
    flex: 1,
  },
  signout: {
    height: 50,
    backgroundColor: button_colors,
    borderRadius: 30,
    justifyContent: 'center',
    marginVertical: 30,
    marginHorizontal: 30,
  },
  button: {
    marginHorizontal: 20,
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  switchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  switchText: {
    color: 'white',
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
  },
  iconStyle: {
    marginHorizontal: 10,
  },
  tooltipContainerStyle: {
    backgroundColor: header_background_color,
    width: DEVICE_WIDTH * 0.5,
  },
  faceShareButton: {
    borderRadius: 20,
    fontSize: 16,

  },
  faceShareText: {
    marginHorizontal: 15,
    marginVertical: 5,
    color: '#fff'
  },
  tooltipContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tooltipText: {
    textAlign: 'center',
    color: 'white',
  },

});
