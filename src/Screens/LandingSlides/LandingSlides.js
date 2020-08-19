import React, {Component} from 'react';
import Swiper from 'react-native-swiper';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import AgreementsPage from './AgreementsPage/AgreementsPage';
import Slide2 from './Slide2/Slide2';

class LandingSlides extends Component {
  render() {
    return (
      <Swiper
        style={styles.wrapper}
        autoplay={false}
        showsButtons={false}
        dotStyle={{height: 7, width: 7}}
        activeDotStyle={{height: 7, width: 7}}
        activeDotColor={'#1490E3'}
        dotColor={'#2a2a2a'}
        loop={false}>
        <SafeAreaView style={styles.slide1}>
          <Slide2 />
        </SafeAreaView>

        <View style={styles.slide3}>
          <AgreementsPage />
        </View>
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default LandingSlides;
