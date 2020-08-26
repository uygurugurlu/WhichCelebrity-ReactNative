import React, {Component} from 'react';
import {translate} from '../../I18n';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {ActionSheetCustom as ActionSheet} from 'react-native-custom-actionsheet';
import {DEVICE_WIDTH} from '../Constants';

class ActionSheetComponent2 extends Component {
  render() {
    const {handlePress, getActionSheetRef, Share} = this.props;

    return (
      <ActionSheet
        ref={getActionSheetRef}
        options={[
          translate('image_picker.cancel'),
          {
            component: (
              <TouchableOpacity
                style={styles.line_container_style}
                onPress={() => Share(0)}>
                <Text style={styles.modal_text_style}>
                  {translate('image_picker.save_result')}
                </Text>
              </TouchableOpacity>
            ),
            height: 65,
          },
          {
            component: (
              <TouchableOpacity
                style={styles.line_container_style}
                onPress={() => Share(1)}>
                <Text style={styles.modal_text_style}>
                  {translate('image_picker.share_result')}
                </Text>
              </TouchableOpacity>
            ),
            height: 65,
          },
          {
            component: (
              <TouchableOpacity
                style={styles.line_container_style}
                onPress={() => Share(2)}>
                <Text style={styles.modal_text_style}>
                  {translate('image_picker.share_app')}
                </Text>
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
  modal_text_style: {
    fontSize: 20,
    marginRight: 25,
    color: '#393636',
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
});

export default ActionSheetComponent2;
