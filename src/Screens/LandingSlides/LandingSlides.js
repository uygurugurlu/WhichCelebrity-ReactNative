import React, {Component} from 'react';
import Swiper from 'react-native-swiper';
import {View, StyleSheet} from 'react-native';
import AgreementsPage from './AgreementsPage/AgreementsPage';

class LandingSlides extends Component {
  render() {
    return (
        <AgreementsPage navigation={this.props.navigation} />
    );
  }
}

const styles = StyleSheet.create({
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default LandingSlides;
