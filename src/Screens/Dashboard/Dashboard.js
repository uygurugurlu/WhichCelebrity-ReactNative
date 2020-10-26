import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground, TouchableOpacity, Button,
} from 'react-native'
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import {

  HOMECARD1,
  HOMECARD2,
  HOMECARD1TR,
  HOMECARD2TR,
  IMAGEBACK,
} from '../../common/Constants';
import { styles } from './DashboardStyles';
import HomeCard from '../../common/Components/DashboardCard.js';
import { translate } from '../../I18n';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.button1 = React.createRef();
  }

  componentDidMount = async () => {
    setTimeout(() => this.props.navigation.openDrawer(),0)
    /*const {isLoggedIn, navigation} = this.props;
    let props = {
      order: 32,
      title: translate("dashboard.showcase_title"),
      description: translate('dashboard.showcase_meta_title'),
      outerCircleColor: header_background_color,
    }

    if(!isLoggedIn){
      setTimeout(async () =>
      {
        await navigation.openDrawer();
        setTimeout(() => {
          let targetView = AppTourView.for(global.signInButton, {...props});

          AppTour.ShowFor(targetView);
        }, 300)
      }
      , 300)
    }*/
  }

  Navigate = (index) => {
    if (index === 1) {
      return 'Celebrity_Finder_Screen';
    }
    return 'Celebrity_Selection_Screen';
  };

  getBackImages(index) {
    if (index != 1) {
      if (index === 2) {
        if (this.props.language.languageTag === 'tr') {
          return HOMECARD2TR;
        }
        const homecard2 = HOMECARD2;
        return homecard2;
      }
    } else {
      if (this.props.language.languageTag == 'tr') {
        return HOMECARD1TR;
      }
      return HOMECARD1;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.imageBack} source={IMAGEBACK}>

          <View style={styles.scoreBoardContainer}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ScoreBoard')} style={styles.scoreBoardWrapper}>
              <View style={styles.scoreBoardFullWidth}>

                <Icon style={styles.scoreBoardIcon} name="leaderboard" color="#fff" />
                <Text style={styles.scoreBoard}>{translate('scoreboard.scoreboard')}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.cardContainer}>
            <Text style={styles.title}>
              {translate('dashboard.first_label')}
            </Text>
            <HomeCard
              image={this.getBackImages(1)}
              navigation={this.props.navigation}
              route={this.Navigate(1)}
            />
          </View>
          <View style={styles.cardContainer}>
            <Text style={styles.title}>
              {translate('dashboard.second_label')}
            </Text>

            <HomeCard
              image={this.getBackImages(2)}
              navigation={this.props.navigation}
              route={this.Navigate(2)}
            />
          </View>

        </ImageBackground>
      </View>

    );
  }
}
const mapStateToProps = (state) => ({
  isLoggedIn: state.mainReducer.isLoggedIn,
  language: state.mainReducer.language,
});
export default connect(mapStateToProps, null)(Dashboard);
