import React, {Component} from 'react';
import {translate} from '../../I18n';
import {Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {CAMERA_ICON, PICTURE_ICON} from '../IconIndex';
import {ActionSheetCustom as ActionSheet} from 'react-native-custom-actionsheet';
import {DEVICE_WIDTH} from '../Constants';

const ICON_SIZE = 33;

class ActionSheetComponent extends Component {
  render() {
    const {
      launchImageLibrary,
      launchCamera,
      handlePress,
      getActionSheetRef,
    } = this.props;

    return (
      <ActionSheet
        ref={getActionSheetRef}
        title={translate('image_picker.title')}
        options={[
          translate('image_picker.cancel'),
          {
            component: (
              <TouchableOpacity
                style={styles.containerStyle}
                onPress={launchImageLibrary}>
                <Text style={styles.textStyle}>
                  {translate('image_picker.photo_library')}
                </Text>
                <Image
                  source={PICTURE_ICON}
                  style={{height: ICON_SIZE, width: ICON_SIZE}}
                />
              </TouchableOpacity>
            ),
            height: 65,
          },
          {
            component: (
              <TouchableOpacity
                style={styles.containerStyle}
                onPress={launchCamera}>
                <Text style={styles.textStyle}>
                  {translate('image_picker.use_camera')}
                </Text>
                <Image
                  source={CAMERA_ICON}
                  style={{height: ICON_SIZE, width: ICON_SIZE}}
                />
              </TouchableOpacity>
            ),
            height: 65,
          },
        ]}
        cancelButtonIndex={0}
        onPress={handlePress}
      />
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 65,
    width: DEVICE_WIDTH,
  },
  textStyle: {
    fontSize: 20,
    marginRight: 25,
    color: '#393636',
  },
});

export default ActionSheetComponent;
