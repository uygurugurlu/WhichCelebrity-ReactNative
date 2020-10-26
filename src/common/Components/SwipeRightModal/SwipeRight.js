import React, { Component } from 'react'
import { StyleSheet, } from 'react-native'
import AnimatedLoader from 'react-native-animated-loader'
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../Constants'


export default class SwipeRight extends Component{
  constructor (props) {
    super(props);
    this.showCaseRef= React.createRef();
  }
  componentDidMount () {

  }
  handlePress = () => {
    this.props.changeVisible(false);
    //if you want to scroll on animation press
    /*if(event === 1) {
      swiperRef.current.scrollTo(1);
    }*/
  }
  render(){
    const {isVisible} = this.props;
    return(
          <AnimatedLoader
            visible={isVisible}
            source={require("./swipeRightAnimation.json")}
            animationStyle={styles.animation}
            speed={1}
            opacity={1}
            pressed={() => this.handlePress()}
            containerStyle={{right:0}}
            changeVisible={() => this.handlePress()}
          />

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

