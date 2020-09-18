import React, {Component} from 'react';
import Avatar from 'rn-avatar';
import {CAMERA_ICON2} from '../IconIndex';
import {DEVICE_WIDTH, shadow} from '../Constants';
import {Image, Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {translate} from '../../I18n';

const size = DEVICE_WIDTH / 2.2;

class AvatarComponent extends Component {
  render() {
    const {ImageSource, SelectAvatar} = this.props;

    return ImageSource === '' ? (
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          style={[styles.imageContainerStyle, shadow]}
          onPress={() => SelectAvatar()}>
          <Image source={CAMERA_ICON2} style={styles.imageStyle} />
        </TouchableOpacity>

        <Text style={styles.choosePhotoTextStyle}>
          {translate('home.select_photo')}
        </Text>
      </View>
    ) : (
      <Avatar
        rounded
        showEditButton={true}
        size={size}
        source={ImageSource}
        title=""
        containerStyle={[{backgroundColor: '#fff'}, shadow]}
        onEditPress={() => SelectAvatar()}
        onPress={() => SelectAvatar()}
        overlayContainerStyle={{margin: 5, backgroundColor: 'white'}}
        editButton={{
          name: 'camera',
          type: 'font-awesome',
          size: size / 7.5,
          style: styles.cameraIconStyle,
          color: '#576f87',
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  imageStyle: {
    height: size * 0.35,
    width: size * 0.35,
    alignSelf: 'center',
  },
  imageContainerStyle: {
    height: size,
    width: size,
    borderRadius: size / 2,
    backgroundColor: '#dedede',
    justifyContent: 'center',
    alignItems: 'center',
  },
  choosePhotoTextStyle: {
    fontSize: 17,
    fontWeight: '600',
    marginTop: 15,
    color: '#123456',
  },
  cameraIconStyle: {
    padding: size / 50,
    marginRight: size / 22.5,
    marginBottom: size / 22.5,
    backgroundColor: '#fff',
    width: size / 4.5,
    height: size / 4.5,
    borderRadius: size / 4.5 / 2,
  },
});

export default AvatarComponent;
