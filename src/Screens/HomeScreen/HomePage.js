import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {translate} from '../../I18n';
import {Button} from 'react-native-elements';
import {styles} from './HomePageStyles';
import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from '@react-native-firebase/admob';
import {get_user_avatar_source} from '../../Store/Actions';
import {GetUserPhotoFromImageLibrary} from '../../CommonlyUsed/Functions/GetUserPhotoFromImageLibrary';
import {GetUserPhotoFromCamera} from '../../CommonlyUsed/Functions/GetUserPhotoFromCamera';
import {RIGHT_HEADER_ICON} from '../../CommonlyUsed/IconIndex';

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-9113500705436853/7410126783';
const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: false,
});
import AvatarComponent from '../../CommonlyUsed/Components/AvatarComponent';
import {GetResult} from '../../CommonlyUsed/Functions/GetResult';
import ActionSheetComponent from '../../CommonlyUsed/Components/ActionSheetComponent';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
      loaded: false,
      setLoaded: false,
      result_loading: false,
    };
  }

  componentWillMount() {
    this.props.navigation.setOptions({
      title: translate('app_name'),
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('SavingsPage', {tab_index: 0})
          }>
          <Image
            source={RIGHT_HEADER_ICON}
            style={{height: 35, width: 35, marginRight: 15}}
          />
        </TouchableOpacity>
      ),
    });
  }

  componentDidMount() {
    interstitial.onAdEvent((type) => {
      if (type === AdEventType.LOADED) {
        this.setState({loaded: true});
      }
    });

    // Start loading the interstitial straight away
    interstitial.load();
  }

  showActionSheet = () => this.actionSheet.show();

  getActionSheetRef = (ref) => (this.actionSheet = ref);

  handlePress = (index) => this.setState({selected: index});

  WhenTheLanguageChanged = () => this.forceUpdate();

  LaunchCamera = async () =>
    await GetUserPhotoFromCamera(this.props.get_user_avatar_source);

  LaunchImageLibrary = async () =>
    await GetUserPhotoFromImageLibrary(this.props.get_user_avatar_source);

  SelectAvatar = () => this.showActionSheet();

  shouldComponentUpdate = async (nextProps, nextState) => {
    const {userAvatarSource, language} = this.props;
    if (nextProps.language.languageTag !== language.languageTag) {
      await this.WhenTheLanguageChanged();
    }

    if (userAvatarSource !== nextProps.userAvatarSource) {
      interstitial.load();
      this.actionSheet.hide();
    }
  };

  GetActionSheet = () => {
    return (
      <ActionSheetComponent
        launchImageLibrary={this.LaunchImageLibrary}
        launchCamera={this.LaunchCamera}
        handlePress={this.handlePress}
        getActionSheetRef={this.getActionSheetRef}
      />
    );
  };

  CheckValidity = () => {
    const {userAvatarSource} = this.props;

    if (userAvatarSource === '') {
      Alert.alert('', translate('mono_compare.validity_alert'));
      return false;
    }

    return true;
  };

  GetResult = async () => {
    const {userAvatarB64} = this.props;

    if (this.CheckValidity()) {
      this.setState({result_loading: true});
      interstitial.onAdEvent((type) => {
        if (type !== AdEventType.LOADED) {
          interstitial.load();
        }
      });

      GetResult(userAvatarB64).then((res) => {
        console.log('res: ', res);
        try {
          interstitial.show();
          this.props.navigation.navigate('ResultPage');
          this.setState({result_loading: false});
        } catch (e) {
          console.log('error on response: ', e);
        }
      });
    }
  };

  render() {
    const {userAvatarSource} = this.props;

    return (
      <View style={styles.backgroundImageStyle}>
        <SafeAreaView style={styles.mainContainer}>
          <View style={styles.labelsContainerStyle}>
            <View display={'flex'} style={styles.topLabel2ContainerStyle}>
              <Text style={styles.topLabel2Style}>
                {translate('famous_compare.compare_header')}
              </Text>
            </View>
          </View>

          <View style={styles.iconsMainContainerStyle}>
            <AvatarComponent
              ImageSource={userAvatarSource}
              SelectAvatar={() => this.SelectAvatar()}
            />
          </View>

          <Button
            title={translate('home.get_result')}
            buttonStyle={styles.resultButtonStyle}
            titleStyle={{fontSize: 18, fontWeight: '600'}}
            onPress={() => this.GetResult()}
            loading={this.state.result_loading}
          />
          {this.GetActionSheet()}
        </SafeAreaView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.mainReducer.language,
    userAvatarSource: state.mainReducer.userAvatarSource,
    userAvatarB64: state.mainReducer.userAvatarB64,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get_user_avatar_source: (source, base64_data) =>
      dispatch(get_user_avatar_source(source, base64_data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
