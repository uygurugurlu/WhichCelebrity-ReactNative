import React, {Component} from 'react';
import Avatar, {Sizes} from 'rn-avatar';
import {GENERIC_USER, CAMERA_ICON2, CAMERA_ICON3, CAMERA_ICON4} from '../IconIndex';
import {DEVICE_WIDTH, shadow} from '../Constants';
import {Image, Text, StyleSheet, View, TouchableOpacity} from "react-native";


const size = DEVICE_WIDTH / 2.2;

class AvatarComponent extends Component {
  render() {
    const {ImageSource, SelectAvatar} = this.props;

    return ImageSource === '' ?

      <View style={{alignItems: 'center'}}>
        <TouchableOpacity style={[styles.imageContainerStyle, shadow]} onPress={() => SelectAvatar()}>
          <Image source={CAMERA_ICON2} style={styles.imageStyle}/>
        </TouchableOpacity>

        <Text style={styles.choosePhotoTextStyle}>Fotoğraf Seçiniz</Text>
      </View>
      :
      <Avatar rounded
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
                size: 25,
                style: {
                  padding: 5,
                  marginRight: 10,
                  marginBottom: 10,
                  backgroundColor: '#f2f2f2',
                  width: 45,
                  height: 45,
                  borderRadius: 22.5
                },
                color: '#576f87',
              }}/>

  }
}

const styles = StyleSheet.create({
  imageStyle: {
    height: size * 0.35,
    width: size * 0.35,
    alignSelf: 'center'
  },
  imageContainerStyle: {
    height: size,
    width: size,
    borderRadius: size / 2,
    backgroundColor: '#dedede',
    justifyContent: 'center',
    alignItems: 'center'
  },
  choosePhotoTextStyle: {
    fontSize: 17,
    fontWeight: '600',
    marginTop: 15,
    color: '#123456'
  }
})
export default AvatarComponent;
