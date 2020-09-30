import React, {Component} from 'react';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Text, StyleSheet, View} from 'react-native';
import {DEVICE_WIDTH} from '../Constants';

const ICON_CONTAINER_SIZE = DEVICE_WIDTH * 0.15;
const DURATION = 2500;

class AnimatedProgressComponent extends Component {
  render() {
    const {fill} = this.props;
    return (
      <View>
        <AnimatedCircularProgress
          size={ICON_CONTAINER_SIZE / 1.25}
          width={0}
          fill={fill}
          duration={DURATION}
          tintColor="red"
          style={styles.iconWrapperStyle}>
          {(fill) => (
            <Text style={styles.percentageTextStyle}>{Math.ceil(fill)}%</Text>
          )}
        </AnimatedCircularProgress>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconWrapperStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35
  },
  percentageTextStyle: {
    color:'white',
    fontSize: 20,
    fontWeight: '900',
  },
});
export default AnimatedProgressComponent;
