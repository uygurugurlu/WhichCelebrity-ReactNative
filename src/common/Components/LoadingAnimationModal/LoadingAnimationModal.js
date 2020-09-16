import React, {Component} from 'react';
import Modal from 'react-native-modal';
import {View, Text, StyleSheet} from "react-native";
import AnimatedLoader from "react-native-animated-loader";
import {DEVICE_HEIGHT, DEVICE_WIDTH} from "../../Constants";
import {translate} from "../../../I18n";
import * as Animatable from 'react-native-animatable';

class LoadingAnimationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animations: [
        require(`./loader_1.json`),
        require(`./loader_2.json`),
        require(`./loader_10.json`),
        require(`./loader_11.json`),
        require(`./loader_12.json`),
        require(`./loader_15.json`),
        require(`./loader_18.json`),
        require(`./loader_21.json`)
      ]
    };
  }

  render() {
    const {isModalVisible} = this.props;
    const rand = Math.floor(Math.random() * 8);     // returns a random integer from 0 to 7

    return (
      <Modal isVisible={isModalVisible}
             transparent={true}>
        <View style={{justifyContent: 'center', alignItems: 'center', height: DEVICE_HEIGHT, width: DEVICE_WIDTH}}>

          <AnimatedLoader visible={isModalVisible}
                          overlayColor="rgba(0,0,0,0.01)"
                          source={this.state.animations[rand]}
                          animationStyle={styles.lottie}
                          speed={1}
                          opacity={1}/>

          <Animatable.View animation="pulse" iterationCount={5} duration={5000} easing={'linear'}>
            <Text style={styles.textStyle}>
              {translate("home.loading_text")}
            </Text>
          </Animatable.View>

        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  lottie: {
    width: DEVICE_WIDTH * 0.3,
    height: DEVICE_WIDTH * 0.3,
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  textStyle: {
    fontSize: 17.5,
    fontWeight: '500',
    color: "#123456",
    backgroundColor: 'white',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: DEVICE_HEIGHT * 0.5,
    marginRight: DEVICE_WIDTH * 0.1,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 7.5,
    overflow: 'hidden',

  }
});

export default LoadingAnimationModal;
