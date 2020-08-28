import React, {Component} from 'react';
import {
  View, Text, Image, TouchableOpacity, SafeAreaView, Alert, ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {translate} from '../../I18n';
import {Button} from 'react-native-elements';
import {styles} from './HomePage2Styles';
import {
  InterstitialAd, AdEventType, TestIds,
} from '@react-native-firebase/admob';
import {get_user_avatar_source} from '../../Store/Actions';
import {GetUserPhotoFromImageLibrary} from '../../common/Functions/GetUserPhotoFromImageLibrary';
import {GetUserPhotoFromCamera} from '../../common/Functions/GetUserPhotoFromCamera';
import {RIGHT_HEADER_ICON} from '../../common/IconIndex';
import AvatarComponent from '../../common/Components/AvatarComponent';
import ActionSheetComponent from '../../common/Components/ActionSheetComponent';
import SearchBarComponent from '../../common/Components/SearchBarComponent';
import {DEVICE_HEIGHT} from '../../common/Constants';
import {SearchCelebrities} from "../../common/Functions/SearchCelebrities";
import {GetCelebrity} from "../../common/Functions/GetCelebrity";
import SelectedCelebrityLine from "../../common/Components/SelectedCelebrityLine";
import {UserPhotoAnalyze2} from "../../common/Functions/UserPhotoAnalyze2";

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-9113500705436853/7410126783';
const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: false,
});

class HomePage2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
      loaded: false,
      setLoaded: false,
      result_loading: false,
      search: '',
      scroll_items: [],
      celebrity_name: "",
      celebrity_photo: "",
      celebrity_id: 0,
      search_visible: true
    };
  }

  componentWillMount() {
    this.props.navigation.setOptions({
      title: translate('app_name'),
      headerRight: () => (
        <TouchableOpacity onPress={() => this.props.navigation.navigate('SavingsPage')}>
          <Image source={RIGHT_HEADER_ICON} style={{height: 35, width: 35, marginRight: 15}}/>
        </TouchableOpacity>
      ),
    });
  }

  componentDidMount() {
    interstitial.onAdEvent((type) => {
      if (type === AdEventType.LOADED) this.setState({loaded: true});
    });

    // Start loading the interstitial straight away
    interstitial.load();
  }

  updateSearch = (search) => {
    this.setState({search: search, profile_visible: search === ""});
  }

  showActionSheet = () => this.actionSheet.show();

  getActionSheetRef = (ref) => (this.actionSheet = ref);

  handlePress = (index) => this.setState({selected: index});

  WhenTheLanguageChanged = () => this.forceUpdate();

  LaunchCamera = async () => await GetUserPhotoFromCamera(this.props.get_user_avatar_source);

  LaunchImageLibrary = async () => await GetUserPhotoFromImageLibrary(this.props.get_user_avatar_source);

  SelectAvatar = () => this.showActionSheet();

  shouldComponentUpdate = async (nextProps, nextState) => {
    const {userAvatarSource, language} = this.props;
    const {search} = this.state;

    if (nextProps.language.languageTag !== language.languageTag) {
      await this.WhenTheLanguageChanged();
    }

    if (userAvatarSource !== nextProps.userAvatarSource) {
      interstitial.load();
      this.actionSheet.hide();
    }

    if (search !== nextState.search) {
      await this.fillScroll(nextState.search);
    }
  };

  GetActionSheet = () => {
    return (
      <ActionSheetComponent launchImageLibrary={this.LaunchImageLibrary}
                            launchCamera={this.LaunchCamera}
                            handlePress={this.handlePress}
                            getActionSheetRef={this.getActionSheetRef}/>
    );
  };

  CheckValidity = () => {
    const {userAvatarSource} = this.props;
    const {celebrity_name} = this.state;

    if (userAvatarSource === '') {
      Alert.alert('', translate('home.avatar_warning'));
      return false;
    } else if (celebrity_name === '') {
      Alert.alert('', translate('home.select_warning'));
      return false;
    }

    return true;
  };

  GetResult = () => {
    const {userAvatarB64, user_agent} = this.props;
    const {celebrity_id, celebrity_photo, celebrity_name} = this.state;

    if (this.CheckValidity()) {
      this.setState({result_loading: true});
      interstitial.onAdEvent((type) => {
        if (type !== AdEventType.LOADED) {
          interstitial.load();
        }
      });

      UserPhotoAnalyze2(user_agent, userAvatarB64, celebrity_id).then((res) => {
        console.log("UserPhotoAnalyze res: ", res);

        try {
          interstitial.show();
          this.props.navigation.navigate('ResultPage2', {
            celebrity_photo: celebrity_photo,
            celebrity_name: celebrity_name,
            data: JSON.parse(res).data
          });
          this.setState({result_loading: false, celebrity_name: ""});
        } catch (e) {
          console.log('error on response: ', e);
        }
      }).catch((err) => {
        console.log("UserPhotoAnalyze res: ", err);
      });
    }
  };

  fillScroll = async (search) => {
    if (search.length > 1) {
      SearchCelebrities(this.props.user_agent, search).then((res) => {
        console.log("Celebrities after search: ", res.data);

        const items = res.data.map((item) => {
          return (
            <TouchableOpacity style={styles.scrollTextContainer} onPress={() => this.CelebritySelected(item)}>
              <Text style={styles.scrollTextStyle}>{item.name}</Text>
            </TouchableOpacity>
          );
        });

        this.setState({scroll_items: items});
      });
    } else {
      this.setState({scroll_items: []});
    }
  };

  CelebritySelected = (celebrity) => {
    const {user_agent} = this.props;
    this.setState({
      search: '',
      scroll_items: [],
      celebrity_name: celebrity.name,
      celebrity_id: celebrity.id,
      search_visible: false
    });

    GetCelebrity(user_agent, celebrity.id).then((res) => {
      console.log("GetCelebrity res: ", res);
      this.setState({celebrity_photo: res.data.photo});
    });
  };

  HideProfile = () => {
    this.setState({search_visible: true});
    console.log("Hide çalıştı");
  }

  render() {
    const {userAvatarSource} = this.props;
    const {search, scroll_items, celebrity_name, celebrity_photo, search_visible} = this.state;

    return (
      <View style={styles.backgroundImageStyle}>
        <SafeAreaView style={styles.mainContainer}>
          <View style={styles.labelsContainerStyle}>

            <View display={search_visible ? 'flex' : 'none'}>
              <SearchBarComponent search={search} updateSearch={this.updateSearch} selectedCelebrity={celebrity_name}/>
            </View>

            <View display={search !== '' ? 'flex' : 'none'}>
              <ScrollView style={{maxHeight: DEVICE_HEIGHT * 0.45}}>
                <View style={styles.scrollViewStyle}>{scroll_items}</View>
              </ScrollView>
            </View>

            <View display={search === '' && search_visible ? 'flex' : 'none'}
                  style={styles.topLabel2ContainerStyle}>
              <Text style={styles.topLabel2Style}>{translate('famous_compare.compare_header')}</Text>
            </View>

            <View display={!search_visible ? 'flex' : 'none'} style={{marginTop: DEVICE_HEIGHT * 0.075}}>
              <SelectedCelebrityLine uri={celebrity_photo}
                                     name={celebrity_name}
                                     handleSelect={() => this.HideProfile()}/>
            </View>

          </View>

          <View display={search === '' ? 'flex' : 'none'} style={styles.iconsMainContainerStyle}>
            <AvatarComponent ImageSource={userAvatarSource} SelectAvatar={() => this.SelectAvatar()}/>
          </View>

          <View display={search === '' ? 'flex' : 'none'}>
            <Button title={translate('home.get_result')}
                    buttonStyle={styles.resultButtonStyle}
                    titleStyle={{fontSize: 18, fontWeight: '600'}}
                    onPress={() => this.GetResult()}
                    loading={this.state.result_loading}/>
          </View>
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
    user_agent: state.mainReducer.user_agent,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get_user_avatar_source: (source, base64_data) =>
      dispatch(get_user_avatar_source(source, base64_data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage2);
