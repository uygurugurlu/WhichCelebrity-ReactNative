import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {translate} from '../../I18n';
import Tooltip from 'react-native-walkthrough-tooltip';
import {DEVICE_WIDTH} from '../Constants';

class TooltipComponent extends Component {
  state = {
    tooltipVisible: false,
  };

  componentWillMount() {
    this.setState({tooltipVisible: this.props.isVisible});
  }

  HandleVisibility = () => {
    this.setState({tooltipVisible: !this.state.tooltipVisible});
  };

  render() {
    const {tooltipVisible} = this.state;

    return (
      <Tooltip
        isVisible={tooltipVisible}
        content={
          <Text style={styles.tooltipTextStyle}>
            {translate('famous_compare.tooltip_text')}
          </Text>
        }
        placement="bottom"
        onClose={() => this.HandleVisibility()}>
        <Text
          style={styles.clickedTextStyle}
          onPress={() => this.HandleVisibility()}>
          {translate('famous_compare.press_random')}
        </Text>
        <View style={styles.dashedLineStyle} />
      </Tooltip>
    );
  }
}

const styles = StyleSheet.create({
  dashedLineStyle: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    borderColor: '#123456',
  },
  tooltipTextStyle: {
    fontSize: 15,
    fontWeight: '500',
    width: DEVICE_WIDTH * 0.6,
    paddingVertical: 7.5,
  },
  clickedTextStyle: {
    color: '#123456',
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: '500',
  },
});

export default TooltipComponent;
