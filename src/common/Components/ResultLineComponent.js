import React, {Component} from 'react';
import {Text, View, StyleSheet} from "react-native";
import {DEVICE_WIDTH} from "../Constants";

class ResultLineComponent extends Component {
  render() {
    const {leftText, rightText} = this.props;
    const hide = typeof rightText === 'undefined' || rightText === null || rightText === "";

    return (
      <View style={styles.containerStyle} display={!hide ? 'flex' : 'none'}>
        <Text style={styles.resultLeftTextStyle}>{leftText}</Text>
        <Text style={styles.resultRightTextStyle}>{rightText}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2.5
  },
  resultLeftTextStyle: {
    width: DEVICE_WIDTH * 0.5,
    fontSize: 17,
    fontWeight: '600',
    color: 'brown',
    textAlign: 'right',
    marginLeft: 7.5
  },
  resultRightTextStyle: {
    width: DEVICE_WIDTH * 0.5,
    fontSize: 18,
    fontWeight: '600',
    color: '#123456',
    textAlign: 'left',
    marginLeft: 7.5
  },
})

export default ResultLineComponent;
