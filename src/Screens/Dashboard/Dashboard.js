import React, {Component} from 'react';
import {SafeAreaView, Text, TouchableOpacity, Image, View, StatusBar} from 'react-native';
import {DEVICE_HEIGHT, DEVICE_WIDTH, shadow, STAR_ICON} from '../../common/Constants';
import {styles} from './DashboardStyles';
import {translate} from '../../I18n';
import {Provider} from "react-redux";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.navigation.setOptions({});
  }

  Navigate = (index) => {
    if (index === 1) {
      this.props.navigation.navigate('HomePage');
    } else {
      this.props.navigation.navigate('HomePage2');
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <TouchableOpacity style={[styles.topContainer, shadow]} onPress={() => this.Navigate(1)}>
          <View style={{width: DEVICE_WIDTH * 0.8, height: DEVICE_HEIGHT * 0.325}}>
            <Image source={STAR_ICON} style={styles.imageStyle}/>
          </View>

          <Text style={styles.textStyle}>{translate('dashboard.first_label')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.bottomContainer, shadow]} onPress={() => this.Navigate(2)}>
          <View style={{width: DEVICE_WIDTH * 0.8, height: DEVICE_HEIGHT * 0.325}}>
            <Image source={STAR_ICON} style={styles.imageStyle}/>
          </View>

          <Text style={styles.textStyle}>{translate('dashboard.second_label')}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

export default Dashboard;
