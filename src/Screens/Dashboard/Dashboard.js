import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  View,
  ImageBackground,
} from 'react-native';
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  shadow,
  WHICHCELEBRITYBACK,
  CALCCELEBRITYBACK,
  IMAGEBACK,
} from '../../common/Constants';
import {styles} from './DashboardStyles';
import HomeCard from '../../common/Components/DashboardCard.js';
import {translate} from '../../I18n';
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
  }

  Navigate = (index) => {
    if (index === 1) {
      return 'Celebrity_Finder_Screen';
    } else {
      return 'Celebrity_Selection_Screen';
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.imageBack} source={IMAGEBACK}>
          <View style={{flex: 1}}>
            <Text style={styles.title}>
              {translate('dashboard.first_label')}
            </Text>
            <HomeCard
              image={WHICHCELEBRITYBACK}
              navigation={this.props.navigation}
              route={this.Navigate(1)}></HomeCard>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.title}>
              {translate('dashboard.second_label')}
            </Text>

            <HomeCard
              image={CALCCELEBRITYBACK}
              navigation={this.props.navigation}
              route={this.Navigate(2)}></HomeCard>
          </View>
        </ImageBackground>
      </View>

      /* <SafeAreaView style={styles.mainContainer}>
        <TouchableOpacity
          style={[styles.topContainer, shadow]}
          onPress={() => this.Navigate(1)}>
          <View
            style={{width: DEVICE_WIDTH * 0.8, height: DEVICE_HEIGHT * 0.325}}>
            <Image source={WHICHCELEBRITYBACK} style={styles.imageStyle}/>
          </View>

          <Text style={styles.textStyle}>
            {translate('dashboard.first_label')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.bottomContainer, shadow]}
          onPress={() => this.Navigate(2)}>
          <View
            style={{width: DEVICE_WIDTH * 0.8, height: DEVICE_HEIGHT * 0.325}}>
            <Image source={CALCCELEBRITYBACK} style={styles.imageStyle}/>
          </View>

          <Text style={styles.textStyle}>
            {translate('dashboard.second_label')}
          </Text>
        </TouchableOpacity>
    </SafeAreaView> */
    );
  }
}

export default Dashboard;
