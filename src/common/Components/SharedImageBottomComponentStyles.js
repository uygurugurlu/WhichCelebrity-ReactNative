import {StyleSheet} from 'react-native';
import {DEVICE_WIDTH} from '../Constants';

export const styles = StyleSheet.create({
  turkaiContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: DEVICE_WIDTH * 0.95,
  },
  turkaiRowContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: DEVICE_WIDTH * 0.95,
    marginHorizontal: DEVICE_WIDTH * 0.05,
  },
  turkaiLogoStyle: {
    height: (DEVICE_WIDTH * 0.275) / 3.80962343096,
    width: DEVICE_WIDTH * 0.275,
  },
  storeImageStyle: {
    height: (DEVICE_WIDTH * 0.25) / 3.80962343096,
    width: DEVICE_WIDTH * 0.25,
  },
  turkaiTextStyle: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(37,37,229,0.77)',
  },
  hikdemisTextStyle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    marginLeft: 5,
  },
  appLogoImageStyle: {
    height: 50,
    width: 50,
    borderRadius: 27.5,
  },
  appLogoContainerStyles: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 10,
  },
});
