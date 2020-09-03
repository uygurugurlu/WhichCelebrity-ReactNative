import {StyleSheet} from 'react-native';
import {DEVICE_WIDTH} from '../Constants';

export const styles = StyleSheet.create({
  turkaiContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: DEVICE_WIDTH * 0.95,
    height: 150,
  },
  turkaiRowContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: DEVICE_WIDTH * 0.95,
    marginHorizontal: DEVICE_WIDTH * 0.05
  },
  turkaiLogoStyle: {
    height: (DEVICE_WIDTH * 0.3) / 3.80962343096,
    width: DEVICE_WIDTH * 0.3,
  },
  storeImageStyle: {
    height: (DEVICE_WIDTH * 0.3) / 3.80962343096,
    width: DEVICE_WIDTH * 0.3,
  },
  turkaiTextStyle: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(37,37,229,0.77)',
  },
  hikdemisTextStyle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'rgba(47,47,49,0.72)',
    marginLeft: 5,
  },
  appLogoImageStyle: {
    height: 55,
    width: 55,
    borderRadius: 27.5
  },
  appLogoContainerStyles: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
  },
});
