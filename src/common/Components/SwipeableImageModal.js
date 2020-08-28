import React, {Component} from 'react';
import {Image, StyleSheet, SafeAreaView, TouchableOpacity} from "react-native";
import Modal from "react-native-modal";
import {DEVICE_HEIGHT, DEVICE_WIDTH} from "../Constants";
import Icon from "react-native-fontawesome-pro";
import {button_colors} from "../ColorIndex";

class SwipeableImageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0, height: 0
    }
  }

  render() {
    const {uri, isVisible, handleVisibility, index} = this.props;
    return (
      <SafeAreaView>
        <Modal isVisible={isVisible}
               onSwipeComplete={handleVisibility}
               onBackdropPress={handleVisibility}
               backdropOpacity={1}
               swipeDirection={['down', "up", 'left', 'right']}>
          <Image source={index === 0 ? uri : {uri: uri}} style={[styles.imageStyle]}/>

          <Icon name={'times'}
                size={50}
                type={'light'}
                color={'#fff'}
                onPress={handleVisibility}
                containerStyle={{alignSelf: 'center', marginTop: DEVICE_HEIGHT * 0.1}}/>
        </Modal>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  imageStyle: {
    alignSelf: 'center',
    resizeMode: 'contain',
    backgroundColor: '#ffffff00',
    height: DEVICE_HEIGHT * 0.6,
    width: DEVICE_WIDTH * 0.9,
  }
});

export default SwipeableImageModal;
