import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  Image,
  TouchableHighlight, TouchableOpacity,
} from 'react-native'
import {translate} from '../../I18n';

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.optionsCard}
          onPress={() => this.props.navigation.navigate(this.props.route)}>
          <ImageBackground style={styles.backImage} source={this.props.image}>
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>
                  {translate('dashboard.click_here')}
                </Text>
                <Image
                  source={require('../../../src/assets/icons/click-icon.png')}
                  style={styles.clickIcon}
                />
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  optionsCard: {
    marginVertical: 10,
    marginHorizontal: 30,
    flex: 0.9,
    maxHeight: 300,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  backImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#7a2898',
    justifyContent: 'center',
    borderRadius: 20,
    height: 40,
    marginHorizontal: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    marginHorizontal: 10,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  clickIcon: {
    height: 20,
    width: 20,
    alignSelf: 'center',
    marginRight: 10,
  },
})
