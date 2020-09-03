import React, {Component} from 'react';
import {
  Image, View, Text, SafeAreaView, TouchableOpacity, Alert,
} from 'react-native';
import {styles} from './AgreementsPageStyles';
import {Button} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import {first_time_login} from '../../../Store/Actions';
import {connect} from 'react-redux';
import {translate} from '../../../I18n';
import CheckBox from '@react-native-community/checkbox';
import {DEVICE_WIDTH} from "../../../common/Constants";

const BANNER = require('../../../assets/icons/banner.png');

class AgreementsPage extends Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      checked2: false,
    };
  }

  Continue = async () => {
    if (this.state.checked && this.state.checked2) {
      await this.StoreData('LOGGED_IN_FIRST_TIME');
    } else {
      Alert.alert('', translate('starter.web_view_alert_text'));
    }
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

  SeeWebViewPage = (index) => {
    if (index === 0) {
      this.props.navigation.navigate('WebViewPage', {
        url: 'https://app-fab.com/apps/hik-demis/kvkk.html',
      });
    } else if (index === 1) {
      this.props.navigation.navigate('WebViewPage', {
        url: 'https://app-fab.com/apps/hik-demis/privacy-policy.html',
      });
    }
  };

  Check = () => {
    this.setState({checked: !this.state.checked});
  };

  Check2 = () => {
    this.setState({checked2: !this.state.checked2});
  };

  render() {
    const {checked, checked2} = this.state;

    return (
      <SafeAreaView style={styles.mainContainerStyle}>
        <Image source={BANNER} style={styles.imageStyle}/>

        <View style={styles.containerStyle}>

          <View style={{marginBottom: DEVICE_WIDTH * 0.1}}>
            <Text style={styles.titleTextStyle}>{translate('app_name')}</Text>
            <Text style={styles.textStyle}>{translate('starter.label1')}</Text>
          </View>

          <View style={styles.kvkkRowContainerStyle}>
            <TouchableOpacity style={styles.kvkkColumnContainerStyle} onPress={() => this.SeeWebViewPage(0)}>
              <Text style={styles.linkTextStyle}>{translate('starter.kvkk_text')}</Text>
            </TouchableOpacity>

            <CheckBox disabled={false} style={{height: 22, width: 22, marginHorizontal: 5}} value={checked}
                      onValueChange={() => this.Check()}/>
          </View>

          <View style={styles.kvkkRowContainerStyle}>
            <TouchableOpacity style={styles.kvkkColumnContainerStyle} onPress={() => this.SeeWebViewPage(1)}>
              <Text style={styles.linkTextStyle}>{translate('starter.privacy_policy_text')}</Text>
            </TouchableOpacity>

            <CheckBox disabled={false} style={styles.checkBoxStyle} value={checked2}
                      onValueChange={() => this.Check2()}/>
          </View>

          <Button title={translate('continue')}
                  onPress={() => this.Continue()}
                  buttonStyle={styles.getPermissionButtonStyle}
                  titleStyle={styles.getPermissionButtonTittleStyle}/>
        </View>


      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    first_time_login: (is_first) => dispatch(first_time_login(is_first)),
  };
};
export default connect(null, mapDispatchToProps)(AgreementsPage);
