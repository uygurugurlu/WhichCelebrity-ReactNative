import React, {Component} from 'react';
import {SafeAreaView, Text, TouchableOpacity, Image, View} from 'react-native';
import {DEVICE_WIDTH, shadow, STAR_ICON} from '../../common/Constants';
import {styles} from './DashboardStyles';
import {translate} from '../../I18n';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
          <Image source={STAR_ICON} style={styles.imageStyle}/>

          <Text style={styles.textStyle}>{translate('dashboard.first_label')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.bottomContainer, shadow]} onPress={() => this.Navigate(2)}>
          <Image source={STAR_ICON} style={styles.imageStyle}/>
          <Text style={styles.textStyle}>{translate('dashboard.second_label')}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

export default Dashboard;
