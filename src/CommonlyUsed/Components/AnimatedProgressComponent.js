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
      <View style={{marginLeft: 10}}>
        <AnimatedCircularProgress
          size={ICON_CONTAINER_SIZE / 1.5}
          width={0}
          fill={fill}
          duration={DURATION}
          tintColor="red"
          style={styles.iconWrapperStyle}
          backgroundColor="#dddddd">
          {(fill) => (
            <Text style={styles.percentageTextStyle}>% {Math.ceil(fill)}</Text>
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
  },
  percentageTextStyle: {
    fontSize: 18,
    fontWeight: '500',
  },
});
export default AnimatedProgressComponent;
