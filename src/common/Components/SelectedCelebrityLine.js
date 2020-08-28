import React, {Component} from 'react';
import {Image, View, StyleSheet, Text, TouchableOpacity} from "react-native";
import {translate} from "../../I18n";
import Icon from "react-native-fontawesome-pro";
import {DEVICE_WIDTH, shadow} from "../Constants";
import {button_colors} from "../ColorIndex";

class SelectedCelebrityLine extends Component {
  render() {
    const {uri, name, handleSelect} = this.props;

    console.log("name: ", name);
    return (
      <View style={[styles.containerStyle, shadow]}>
        <Image source={{uri: uri}} style={[styles.imageStyle]}/>

        <View style={styles.middleContainerStyle}>
          <Text style={styles.headerTextStyle}>{translate('home.selected_celebrity')}</Text>
          <Text style={styles.nameTextStyle}>{name}</Text>
        </View>

        <TouchableOpacity onPress={() => handleSelect()} style={{padding: 5, alignSelf: 'center'}}>
          <Icon name={'times'} size={35} type={'light'} color={button_colors} containerStyle={{alignSelf: 'center'}}/>
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
    backgroundColor: '#dedede',
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
    color: '#ff0051',
    marginTop: 7.5
  },
  headerTextStyle: {
    fontSize: 16,
    fontWeight: '500'
  }


})
export default SelectedCelebrityLine;
