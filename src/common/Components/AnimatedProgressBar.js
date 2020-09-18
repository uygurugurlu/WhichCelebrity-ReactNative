import React, {Component} from 'react';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import {DEVICE_WIDTH} from '../Constants';

class AnimatedProgressBar extends Component {
  render() {
    const {fill, onComplete} = this.props;
    const barWidth = DEVICE_WIDTH * 0.75;

    return (
      <ProgressBarAnimated
        width={barWidth}
        value={fill}
        backgroundColor={'green'}
        borderRadius={5}
        barAnimationDuration={2500}
        onComplete={onComplete}
        backgroundColorOnComplete="#6CC644"
      />
    );
  }
}

export default AnimatedProgressBar;
