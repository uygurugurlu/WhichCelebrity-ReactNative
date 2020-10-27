import React, {Component} from 'react';
import Swiper from 'react-native-swiper';
import { View, StyleSheet, ImageBackground, Text } from 'react-native'
import AgreementsPage from './AgreementsPage/AgreementsPage';
import { IMAGEBACK } from '../../common/Constants'
import { Button, Icon } from 'react-native-elements'
import { translate } from '../../I18n'
import { yellow_text_color } from '../../common/ColorIndex'
import messaging from '@react-native-firebase/messaging'
import { first_time_login } from '../../Store/Actions'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'

class RequestPermission extends Component {
  handleGivePermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED
      || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      await this.StoreData('LOGGED_IN_FIRST_TIME');
    }
  }
  handleDenyPermission = async () => {
    await this.StoreData('LOGGED_IN_FIRST_TIME');

  };
  StoreData = async (key) => {
    try {
      await AsyncStorage.setItem(key, 'true');
      console.log('saving successfully to AsyncStorage');
      this.props.first_time_login(false);
    } catch (e) {
      // saving error
      console.log('saving error to AsyncStorage');
    }
  };
  render() {
    return (
      <View style={styles.mainContainerStyle}>
        <ImageBackground style={styles.containerStyle} source={IMAGEBACK}>
          <View style={styles.textContainer}>
            <Text style={styles.mainTextStyle}>{translate("permission.label")}</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonWrapper}>
              <Button
                title={translate("permission.give_permission")}
                containerStyle={styles.faceShareButton}
                buttonStyle={{backgroundColor:"#26c92e"}}
                onPress={() => this.handleGivePermission()}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <Button
                title={translate("permission.deny_permission")}
                containerStyle={styles.faceShareButton}
                buttonStyle={{backgroundColor:"red"}}
                onPress={() => this.handleDenyPermission()}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
  },
  containerStyle: {
    alignItems: 'center',
    flex: 1,
    resizeMode: 'cover',
    justifyContent:'center',
  },
  textContainer:{
    flex: 0.4,
    marginHorizontal: 30,
    justifyContent: 'center',
  },
  mainTextStyle: {
    textAlign: 'center',
    fontSize: 18,
    color: '#fff',
  },
  buttonsContainer: {
    flex: 0.6,
    justifyContent: 'center',
  },
  buttonWrapper: {
    flexDirection: 'row',
    marginHorizontal: 30,
    marginVertical: 15,
  },
  faceShareButton: {
    borderRadius: 20,
    fontSize: 16,
    width: '100%'
  },
});

const mapStateToProps = (state) => {
  return {
    language: state.mainReducer.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    first_time_login: (is_first) => dispatch(first_time_login(is_first)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RequestPermission);
