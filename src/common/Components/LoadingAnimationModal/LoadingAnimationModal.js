import React, {Component} from 'react';
import Modal from 'react-native-modal';
import {View, Text, StyleSheet} from "react-native";
import AnimatedLoader from "react-native-animated-loader";
import {DEVICE_HEIGHT, DEVICE_WIDTH} from "../../Constants";
import {translate} from "../../../I18n";

class LoadingAnimationModal extends Component {

  render() {
    const {isModalVisible} = this.props;

    return (

      <Modal isVisible={isModalVisible}
             transparent={true}>
        <View
          style={{justifyContent: 'center', alignItems: 'center', height: DEVICE_HEIGHT, width: DEVICE_WIDTH}}>

          <AnimatedLoader
            visible={isModalVisible}
            overlayColor="rgba(0,0,0,0.01)"
            source={require("./loader_1.json")}
            animationStyle={styles.lottie}
            speed={1}
            opacity={1}
          />


          <Text style={styles.textStyle}>
            {translate("home.loading_text")}
          </Text>

        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  lottie: {
    width: DEVICE_WIDTH * 0.25,
    height: DEVICE_WIDTH * 0.25,
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  textStyle: {
    fontSize: 20,
    fontWeight: '500',
    color: "red",
    backgroundColor: 'white',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: DEVICE_HEIGHT * 0.4,
    marginRight: DEVICE_WIDTH * 0.1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
    overflow: 'hidden'
  }
});

export default LoadingAnimationModal;
