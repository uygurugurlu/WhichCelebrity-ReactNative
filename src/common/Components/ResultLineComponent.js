import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

class ResultLineComponent extends Component {
  render() {
    const {leftText, rightText} = this.props;
    const hide =
      typeof rightText === 'undefined' ||
      rightText === null ||
      rightText === '';

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
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 2.5,
  },
  resultLeftTextStyle: {
    fontSize: 17,
    fontWeight: '600',
    color: 'brown',
    textAlign: 'left',
  },
  resultRightTextStyle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#123456',
    textAlign: 'left',
    marginLeft: 7.5,
  },
});

export default ResultLineComponent;
