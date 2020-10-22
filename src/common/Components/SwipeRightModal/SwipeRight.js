import React, { Component } from 'react'
import { Modal, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import AnimatedLoader from 'react-native-animated-loader'
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../Constants'
import { AppTour, AppTourView } from 'react-native-app-tour'
import { get_captured_image_uri, get_user_avatar_source, trigger_savings_page } from '../../../Store/Actions'
import { connect } from 'react-redux'

export default class SwipeRight extends Component{
  constructor (props) {
    super(props);
    this.showCaseRef= React.createRef();
  }
  componentDidMount () {

  }
  handlePress = async (event) => {
    await this.props.changeVisible(false);
    //if you want to scroll on animation press
    /*if(event === 1) {
      swiperRef.current.scrollTo(1);
    }*/
  }
  render(){
    const {isVisible} = this.props;
    return(
      <View style={styles.container}>
          <AnimatedLoader
            visible={isVisible}
            source={require("./swipeRightAnimation.json")}
            animationStyle={styles.animation}
            speed={1}
            opacity={1}
            pressed={() => this.handlePress()}
            containerStyle={{right:0}}
          />
      </View>

    )
  }
}
const styles= StyleSheet.create({
  container: {
    position: 'absolute',
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    justifyContent:'center',
  },
  invisibleView: {
    height: 100,
    width: 5,
    position: 'absolute',
    left: 0,
    alignSelf: 'center',
  },
  animationContainer: {
    height: 100,
    width: DEVICE_WIDTH,
    alignItems:"center",
    justifyContent: 'center',
  },
  animation : {
    height: 50,
    width: 50,
    left: 0,
    alignSelf: 'flex-start',
  },
})

