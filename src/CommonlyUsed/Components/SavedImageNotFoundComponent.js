import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../CommonlyUsedConstants';
import {translate} from '../../I18n';

class SavedImageNotFoundComponent extends Component {
  render() {
    return (
      <View style={styles.mainContainerStyle}>
        <View style={styles.containerStyle}>
          <Text style={styles.textStyle}>{translate('saved.not_found')}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: DEVICE_HEIGHT * 0.05,
  },
  containerStyle: {
    width: DEVICE_WIDTH * 0.9,
    height: DEVICE_HEIGHT * 0.2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  textStyle: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    color: 'gray',
  },
});

export default SavedImageNotFoundComponent;
