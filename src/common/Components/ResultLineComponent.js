import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {blue_text_color} from '../../../src/common/ColorIndex.js';
class ResultLineComponent extends Component {
  render() {
    const {leftText, rightText, icon} = this.props;
    const hide =
      typeof rightText === 'undefined' ||
      rightText === null ||
      rightText === '';

    return (
      <View style={styles.containerStyle} display={!hide ? 'flex' : 'none'}>
        <View style={styles.iconContainer}>
          <Image source={icon} style={styles.iconStyle}/>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.resultLeftTextStyle}>{leftText}</Text>
        </View>
        <View style={styles.resultContainer}>
          <Text style={styles.resultRightTextStyle}>{rightText}</Text>
        </View>
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
  iconStyle: {
    height: 30,
    width: 30,
  },
  iconContainer: {
    flex: 0.15,
    justifyContent:'center',
    alignItems:'center',
  },
  titleContainer: {
    flex: 0.25,
  },
  resultContainer: {
    flex: 0.6,
  },
  resultLeftTextStyle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: blue_text_color,
    textAlign: 'left',
  },
  resultRightTextStyle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#123456',
    textAlign: 'left',
    marginLeft: 7.5,
  },
});

export default ResultLineComponent;
