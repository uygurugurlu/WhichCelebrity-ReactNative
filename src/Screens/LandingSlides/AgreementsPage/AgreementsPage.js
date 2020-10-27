import React, {Component} from 'react';
import { Image, View, Text, SafeAreaView, Alert, ImageBackground, Platform } from 'react-native'
import {styles} from './AgreementsPageStyles';
import {Button} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import {first_time_login} from '../../../Store/Actions';
import {connect} from 'react-redux';
import {translate} from '../../../I18n';
import CheckBox from '@react-native-community/checkbox';
import {
  DEVICE_WIDTH,
  KVKK_LINK_EN,
  KVKK_LINK_TR,
  PRIVACY_POLICY_LINK_EN,
  PRIVACY_POLICY_LINK_TR,
  IMAGEBACK,
} from '../../../common/Constants';

const BANNER = require('../../../assets/icons/banner.png');

class AgreementsPage extends Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      checked2: false,
      languageTag: 'en',
    };
  }

  componentDidMount() {
    const {language} = this.props;
    this.setState({languageTag: language.languageTag});
  }

  Continue = async () => {
    if (this.state.checked && this.state.checked2) {
      if(Platform.OS == 'ios'){
        this.props.navigation.navigate("RequestPermission");
      }
      else{
        await this.StoreData('LOGGED_IN_FIRST_TIME');
      }
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
    const {languageTag} = this.state;

    const kvkk_link = languageTag === 'tr' ? KVKK_LINK_TR : KVKK_LINK_EN;
    const policy_link =
      languageTag === 'tr' ? PRIVACY_POLICY_LINK_TR : PRIVACY_POLICY_LINK_EN;

    if (index === 0) {
      this.props.navigation.navigate('WebViewPage', {
        url: kvkk_link,
      });
    } else if (index === 1) {
      this.props.navigation.navigate('WebViewPage', {
        url: policy_link,
      });
    }
  };

  Check = () => {
    this.setState({checked: !this.state.checked});
  };

  Check2 = () => {
    this.setState({checked2: !this.state.checked2});
  };

  shouldComponentUpdate = async (nextProps, nextState) => {
    const {language} = this.props;
    if (nextProps.language.languageTag !== language.languageTag) {
      this.setState({languageTag: nextProps.language.languageTag});
      await this.forceUpdate();
    }
  };

  render() {
    const {checked, checked2, languageTag} = this.state;

    return (
      <View style={styles.mainContainerStyle}>
        <ImageBackground style={styles.containerStyle} source={IMAGEBACK}>
          <Image source={BANNER} style={styles.imageStyle} />

          <View
            style={{
              marginTop: DEVICE_WIDTH * 0.05,
              marginBottom: DEVICE_WIDTH * 0.2,
            }}>
            <Text style={styles.titleTextStyle}>{translate('app_name')}</Text>
            <Text style={styles.textStyle}>{translate('starter.label1')}</Text>
          </View>

          <View
            style={{
              flexDirection: 'column',
              width: DEVICE_WIDTH * 0.85,
              alignSelf: 'center',
            }}>
            <View style={styles.kvkkRowContainerStyle}>
              <View style={{width: DEVICE_WIDTH * 0.77}}>
                <Text
                  style={
                    languageTag === 'tr'
                      ? styles.linkTextStyle
                      : styles.acceptTextStyle
                  }
                  onPress={() => this.SeeWebViewPage(0)}>
                  {languageTag === 'tr'
                    ? translate('starter.kvkk_text')
                    : translate('starter.read_and_accept')}
                  <Text
                    style={
                      languageTag === 'tr'
                        ? styles.acceptTextStyle
                        : styles.linkTextStyle
                    }
                    onPress={() => this.SeeWebViewPage(0)}>
                    {languageTag === 'tr'
                      ? translate('starter.read_and_accept')
                      : translate('starter.kvkk_text')}
                  </Text>
                </Text>
              </View>

              <CheckBox
                disabled={false}
                style={styles.checkBoxStyle}
                value={checked}
                onValueChange={() => this.Check()}
                tintColors={'white'}
              />
            </View>

            <View style={styles.kvkkRowContainerStyle}>
              <View style={{width: DEVICE_WIDTH * 0.77}}>
                <Text
                  style={
                    languageTag === 'tr'
                      ? styles.linkTextStyle
                      : styles.acceptTextStyle
                  }
                  onPress={() => this.SeeWebViewPage(1)}>
                  {languageTag === 'tr'
                    ? translate('starter.privacy_policy_text')
                    : translate('starter.read_and_accept')}
                  <Text
                    style={
                      languageTag === 'tr'
                        ? styles.acceptTextStyle
                        : styles.linkTextStyle
                    }
                    onPress={() => this.SeeWebViewPage(1)}>
                    {languageTag === 'tr'
                      ? translate('starter.read_and_accept')
                      : translate('starter.privacy_policy_text')}
                  </Text>
                </Text>
              </View>

              <CheckBox
                disabled={false}
                style={styles.checkBoxStyle}
                value={checked2}
                onValueChange={() => this.Check2()}
                tintColors={'white'}

              />
            </View>
          </View>
          <Button
            title={translate('continue')}
            onPress={() => this.Continue()}
            buttonStyle={styles.getPermissionButtonStyle}
            titleStyle={styles.getPermissionButtonTittleStyle}
          />
        </ImageBackground>
      </View>
    );
  }
}

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
export default connect(mapStateToProps, mapDispatchToProps)(AgreementsPage);
