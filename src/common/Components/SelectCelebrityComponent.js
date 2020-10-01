import React, {Component} from 'react';
import {Icon} from 'react-native-elements';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../Constants';
import {
  Platform,
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
} from 'react-native';
import {translate} from '../../I18n';

class SelectCategoryComponent extends Component {
  render() {
    const {
      selectedCelebrity,
      cancelCelebrity,
      setCelebrityModalVisible,
    } = this.props;

    return (
      <TouchableHighlight
        style={styles.selectCategoryContainer}
        onPress={setCelebrityModalVisible}>
        <View style={styles.selectCategoryWrapper}>
          <Text style={styles.selectCategoryText}>
            {selectedCelebrity == ''
              ? translate('home.select_celebrity')
              : selectedCelebrity}
          </Text>
          <Icon name="keyboard-arrow-right" color="#284077" />
        </View>
      </TouchableHighlight>
    );
  }
}
const styles = StyleSheet.create({
  selectCategoryContainer: {
    height: 40,
    justifyContent: 'center',
    width: DEVICE_WIDTH - 60,
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: 'rgb(240,240,240)',
  },
  selectCategoryText: {
    flexDirection: 'row',
    flex: 0.8,
    color: '#284077',
    textAlign: 'center',
    fontWeight: '700',
  },
  selectCategoryWrapper: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SelectCategoryComponent;
