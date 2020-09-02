import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import {translate} from "../../I18n";
import Icon from "react-native-fontawesome-pro";
import {DEVICE_WIDTH, shadow} from "../Constants";
import {button_colors} from "../ColorIndex";
import CacheImageComponent from "./CacheImagecomponent";

class SelectedCelebrityLine extends Component {
  render() {
    const {uri, name, handleSelect} = this.props;

    return (
      <View style={[styles.containerStyle, shadow]}>
        <CacheImageComponent uri={uri} reduce_ratio={5}/>

        <View style={styles.middleContainerStyle}>
          <Text style={styles.headerTextStyle}>{translate('home.selected_celebrity')}</Text>
          <Text style={styles.nameTextStyle}>{name}</Text>
        </View>

        <TouchableOpacity onPress={() => handleSelect()} style={{padding: 5, alignSelf: 'center'}}>
          <Icon name={'times'} size={35} type={'light'} color={'#b4013a'} containerStyle={{alignSelf: 'center'}}/>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: DEVICE_WIDTH * 0.9,
    paddingVertical: 7.5,
    paddingHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 5
  },
  middleContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: DEVICE_WIDTH * 0.5,
  },
  imageStyle: {
    height: DEVICE_WIDTH * 0.2,
    width: DEVICE_WIDTH * 0.2,
  },
  nameTextStyle: {
    fontSize: 18,
    fontWeight: '600',
    color: button_colors,
    marginTop: 7.5
  },
  headerTextStyle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'gray'
  }


})
export default SelectedCelebrityLine;
