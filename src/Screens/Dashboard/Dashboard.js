import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {shadow} from '../../CommonlyUsed/CommonlyUsedConstants';
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
      <View style={styles.mainContainer}>
        <TouchableOpacity
          style={[styles.topContainer, shadow]}
          onPress={() => this.Navigate(1)}>
          <Text style={styles.textStyle}>
            {translate('dashboard.first_label')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.bottomContainer, shadow]}
          onPress={() => this.Navigate(2)}>
          <Text style={styles.textStyle}>
            {translate('dashboard.second_label')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Dashboard;
