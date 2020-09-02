import React, {Component} from 'react';
import {SearchBar} from 'react-native-elements';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../Constants';
import {Platform, StyleSheet} from 'react-native';
import {translate} from '../../I18n';

class SearchBarComponent extends Component {
  render() {
    const {search, updateSearch, selectedCelebrity} = this.props;
    const place_holder =
      selectedCelebrity === '' ? translate('home.select_celebrity') : translate('home.select_another_celebrity');
    return (
      <SearchBar placeholder={place_holder}
                 onChangeText={updateSearch}
                 value={search}
                 searchIcon={null}
                 inputContainerStyle={styles.inputContainerStyle}
                 inputStyle={{color: '#000'}}
                 containerStyle={styles.containerStyle}
                 platform={Platform.OS === 'ios' ? 'ios' : 'android'}
                 cancelButtonTitle={translate("home.cancel")}
                 lightTheme={true}
                 showLoading={false}/>
    );
  }
}

const styles = StyleSheet.create({
  inputContainerStyle: {
    height: DEVICE_HEIGHT * 0.07,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    alignSelf: 'center',
    paddingLeft: Platform.OS === 'ios' ? 15 : 0,
    borderBottomWidth: Platform.OS === 'ios' ? 0 : 1.2,
    borderColor: '#dedddd',
  },
  containerStyle: {
    height: DEVICE_HEIGHT * 0.08,
    width: DEVICE_WIDTH * 0.95,
    marginTop: 10,
    backgroundColor: '#fafafa',
    borderColor: '#dedddd',
    borderWidth: 1.2,
  },
});

export default SearchBarComponent;
