import React, {Component} from 'react';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import {DEVICE_WIDTH} from '../Constants';

class AnimatedProgressBar extends Component {
  render() {
    const {fill, onComplete, margin} = this.props;
    const barWidth = DEVICE_WIDTH;

    return (
      <ProgressBarAnimated
        width={barWidth - 60}
        value={fill}
        height={13}
        backgroundColor={'white'}
        borderRadius={20}
        barAnimationDuration={2500}
        onComplete={onComplete}
        backgroundColorOnComplete="#6CC644"
      />
    );
  }
}

export default AnimatedProgressBar;
