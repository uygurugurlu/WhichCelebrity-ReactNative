import React, {Component} from 'react';
import {DEVICE_WIDTH, CAMERAFRAME, CAMERAICON} from '../Constants';
import { Image, StyleSheet, View, TouchableHighlight } from 'react-native'

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
