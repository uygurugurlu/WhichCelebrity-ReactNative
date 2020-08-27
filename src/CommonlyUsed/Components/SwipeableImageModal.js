import React, {Component} from 'react';
import {Image, View, StyleSheet, SafeAreaView} from "react-native";
import Modal from "react-native-modal";
import {DEVICE_HEIGHT, DEVICE_WIDTH} from "../Constants";

class SwipeableImageModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {uri, isVisible, handleVisibility, index} = this.props;

    return (
      <SafeAreaView>
        <Modal isVisible={isVisible}
               onSwipeComplete={handleVisibility}
               swipeDirection={['down', "up", 'left', 'right']}
               swipeThreshold={50}>
          <View style={styles.containerStyle}>
            <Image source={index === 0 ? uri : {uri: uri}} style={styles.imageStyle}/>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white",
    borderRadius: 10
  },
  imageStyle: {
    height: DEVICE_HEIGHT * 0.7,
    width: DEVICE_WIDTH * 0.8,
    resizeMode: 'contain',
  }
});

export default SwipeableImageModal;
