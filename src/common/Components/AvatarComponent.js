import React, {Component} from 'react';
import Avatar from 'rn-avatar';
import {CAMERA_ICON2} from '../IconIndex';
import {DEVICE_WIDTH, shadow, CAMERAFRAME, CAMERAICON} from '../Constants';
import {Image, Text, StyleSheet, View, TouchableHighlight} from 'react-native';
import {translate} from '../../I18n';

const size = DEVICE_WIDTH / 2.2;

class AvatarComponent extends Component {
  render() {
    const {ImageSource, SelectAvatar} = this.props;
    return (
      <View style={styles.cameraImageContainer}>
        <Image source={CAMERAFRAME} style={styles.cameraImage} />
        <TouchableHighlight
          style={styles.cameraButton}
          onPress={() => SelectAvatar()}>
          <View style={styles.cameraWrapper}>
            <Image
              source={ImageSource ? ImageSource : CAMERAICON}
              style={styles.cameraIcon}
            />
          </View>
        </TouchableHighlight>
      </View>
    );

    /*return ImageSource === '' ? (
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
    ); */
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

  cameraImageContainer: {
    alignSelf: 'center',
    height: 200,
    width: 200,
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
});

export default AvatarComponent;
