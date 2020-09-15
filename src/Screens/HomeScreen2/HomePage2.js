import React, {Component} from 'react';
import {
  View, Text, Image, TouchableOpacity, SafeAreaView, Alert, ScrollView, Platform
} from 'react-native';
import {connect} from 'react-redux';
import {translate} from '../../I18n';
import {Button} from 'react-native-elements';
import {styles} from './HomePage2Styles';
import {InterstitialAd, AdEventType, TestIds} from '@react-native-firebase/admob';
import {get_detected_face_count, get_user_avatar_source} from '../../Store/Actions';
import {GetUserPhotoFromImageLibrary} from '../../common/Functions/GetUserPhotoFromImageLibrary';
import {GetUserPhotoFromCamera} from '../../common/Functions/GetUserPhotoFromCamera';
import {RIGHT_HEADER_ICON} from '../../common/IconIndex';
import AvatarComponent from '../../common/Components/AvatarComponent';
import ActionSheetComponent from '../../common/Components/ActionSheetComponent';
import SearchBarComponent from '../../common/Components/SearchBarComponent';
import {DEVICE_HEIGHT, DEVICE_WIDTH, shadow} from '../../common/Constants';
import {SearchCelebrities} from "../../common/Functions/Endpoints/SearchCelebrities";
import {GetCelebrity} from "../../common/Functions/Endpoints/GetCelebrity";
import SelectedCelebrityLine from "../../common/Components/SelectedCelebrityLine";
import {UserPhotoAnalyze2} from "../../common/Functions/Endpoints/UserPhotoAnalyze2";
import CacheImageComponent from "../../common/Components/CacheImagecomponent";
import TooltipComponent from "../../common/Components/TooltipComponent";
import {ShowSnackBar} from "../../common/Components/ShowSnackBar";
import {DetectFace} from "../../common/Functions/DetectFace";
import LoadingAnimationModal from "../../common/Components/LoadingAnimationModal/LoadingAnimationModal";

const unit_id = Platform.OS === "ios" ? 'ca-app-pub-9113500705436853/7410126783' : 'ca-app-pub-9113500705436853/6296695945';
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : unit_id;
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
      random_result_loading: false,
      search: '',
      scroll_items: [],
      celebrity_name: "",
      celebrity_photo: "",
      celebrity_id: 0,
      search_visible: true,
      tooltipVisible: false,
      detected_faces: false
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

  componentDidMount = () => interstitial.load();

  updateSearch = (search) => this.setState({search: search, profile_visible: search === ""});

  showActionSheet = () => this.actionSheet.show();

  getActionSheetRef = (ref) => (this.actionSheet = ref);

  handlePress = (index) => this.setState({selected: index});

  WhenTheLanguageChanged = () => this.forceUpdate();

  LaunchCamera = async () => {
    const {path, data} = await GetUserPhotoFromCamera();
    this.props.get_user_avatar_source({uri: path}, data);
    const faces = await DetectFace(path);
    this.props.get_detected_face_count(faces.length);
    console.log("faces:", faces, faces.length);
  };

  LaunchImageLibrary = async () => {
    const {path, data} = await GetUserPhotoFromImageLibrary();
    this.props.get_user_avatar_source({uri: path}, data);
    const faces = await DetectFace(path);
    this.props.get_detected_face_count(faces.length);
    console.log("faces:", faces, faces.length);
  };

  SelectAvatar = () => this.showActionSheet();

  shouldComponentUpdate = async (nextProps, nextState) => {
    const {userAvatarSource, language} = this.props;
    const {search} = this.state;

    if (nextProps.language.languageTag !== language.languageTag) {
      await this.WhenTheLanguageChanged();
    }

    if (userAvatarSource !== nextProps.userAvatarSource) {
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

  CheckValidity = (random) => {
    const {userAvatarSource, detected_face_count} = this.props;
    const {celebrity_name} = this.state;

    if (userAvatarSource === '') {
      Alert.alert('', translate('home.avatar_warning'));
      return false;
    } else if (celebrity_name === '' && !random) {
      Alert.alert('', translate('home.select_warning'));
      return false;
    } else if (detected_face_count === 0) {
      ShowSnackBar(translate("home.face_not_found"), "LONG", "TOP", "ERROR");
      return false;
    } else if (detected_face_count > 1) {
      ShowSnackBar(translate("home.more_than_one_face_found"), "LONG", "TOP", "ERROR");
      return false;
    }

    return true;
  };

  LoadAD = () => {
    interstitial.onAdEvent((type) => {
      if (type !== AdEventType.LOADED || type === AdEventType.CLOSED) {
        console.log(" AdEventType.LOADED: ", type === AdEventType.LOADED);
        console.log(" AdEventType.CLOSED: ", type === AdEventType.CLOSED);
        interstitial.load();
      }
    });
  };

  ShowAD = async () => {
    try {
      await interstitial.show();
    } catch (e) {
      console.log("Error ShowAD: ", e);
    }
  };

  NavigateToResultPage2 = (data) => {
    const {celebrity_name} = this.state;
    this.props.navigation.navigate('ResultPage2', {
      celebrity_photo: data.celebrity.photo,
      celebrity_name: celebrity_name,
      data: data
    });
  }

  GetResult = async () => {
    const {userAvatarB64, user_agent, language} = this.props;
    const {celebrity_id} = this.state;
    this.LoadAD();

    if (this.CheckValidity(false)) {
      this.setState({result_loading: true});

      try {
        const {data} = await UserPhotoAnalyze2(user_agent, userAvatarB64, celebrity_id, language.languageTag, "false");
        console.log("UserPhotoAnalyze res: ", JSON.parse(data).data[0]);

        if (JSON.parse(data).status === 'error') {
          ShowSnackBar(JSON.parse(data).message, "SHORT", "TOP", "ERROR");
        } else {
          this.setState({result_loading: false});
          await this.ShowAD();
          this.NavigateToResultPage2(JSON.parse(data).data[0]);
          this.HideProfile();
        }
      } catch (e) {
        console.log("Error UserPhotoAnalyze2: ", e);
        ShowSnackBar(translate("home.result_not_found"), "SHORT", "TOP", "ERROR");
      }

      this.setState({result_loading: false});
    }
  };

  GetRandomResult = async () => {
    const {userAvatarB64, user_agent, language} = this.props;
    this.LoadAD();

    if (this.CheckValidity(true)) {

      try {
        await this.setState({random_result_loading: true});
        const {data} = await UserPhotoAnalyze2(user_agent, userAvatarB64, null, language.languageTag, "true");
        console.log("UserPhotoAnalyze res: ", JSON.parse(data).data[0]);

        if (JSON.parse(data).status === 'error') {
          ShowSnackBar(JSON.parse(data).message, "SHORT", "TOP", "ERROR");
        } else {
          this.setState({result_loading: false});
          await this.ShowAD();
          this.NavigateToResultPage2(JSON.parse(data).data[0]);
          this.HideProfile();
        }

      } catch (e) {
        console.log("Error UserPhotoAnalyze2: ", e);
        ShowSnackBar(translate("home.result_not_found"), "SHORT", "TOP", "ERROR");
      }

      this.setState({random_result_loading: false});
    }
  }

  fillScroll = async (search) => {
    if (search.length > 1) {
      SearchCelebrities(this.props.user_agent, search).then((res) => {
        console.log("Celebrities after search: ", res.data);

        const items = res.data.map((item) => {
          return (
            <TouchableOpacity style={styles.scrollItemContainer} onPress={() => this.CelebritySelected(item)}>
              <View style={[{marginHorizontal: DEVICE_WIDTH * 0.051}, shadow]}>
                <CacheImageComponent uri={item.photo} reduce_ratio={10}/>
              </View>
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
    this.setState({search_visible: true, celebrity_name: ''});
  }

  render() {
    const {userAvatarSource} = this.props;
    const {search, scroll_items, celebrity_name, celebrity_photo, search_visible, tooltipVisible, random_result_loading, result_loading} = this.state;

    return (
      <View style={styles.backgroundImageStyle}>
        <SafeAreaView style={styles.mainContainer}>
          <View style={styles.labelsContainerStyle}>

            <View display={search === '' && search_visible ? 'flex' : 'none'} style={styles.topLabel2ContainerStyle}>
              <Text style={styles.topLabel2Style}>{translate('famous_compare.compare_header')}</Text>
              <TooltipComponent isVisible={tooltipVisible}/>
            </View>

            <View display={search_visible ? 'flex' : 'none'}>
              <SearchBarComponent search={search} updateSearch={this.updateSearch} selectedCelebrity={celebrity_name}/>
            </View>

            <View display={search !== '' ? 'flex' : 'none'}>
              <ScrollView style={{maxHeight: DEVICE_HEIGHT * 0.75, color: '#fff'}}>
                <View style={styles.scrollViewStyle}>{scroll_items}</View>
              </ScrollView>
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

          <View style={{flexDirection: 'row', justifyContent: 'space-between', width: DEVICE_WIDTH * 0.9}}
                display={search === '' ? 'flex' : 'none'}>
            <Button title={translate('home.random_compare')}
                    buttonStyle={styles.randomButtonStyle}
                    titleStyle={{fontSize: 17, fontWeight: '600'}}
                    onPress={() => this.GetRandomResult()}
                    disabled={celebrity_name !== ""}
                    loading={random_result_loading}/>

            <Button title={translate('home.get_result')}
                    buttonStyle={styles.resultButtonStyle}
                    titleStyle={{fontSize: 17, fontWeight: '600'}}
                    onPress={() => this.GetResult()}
                    loading={result_loading}/>
          </View>

          {this.GetActionSheet()}
          <LoadingAnimationModal isModalVisible={result_loading || random_result_loading}/>
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
    detected_face_count: state.mainReducer.detected_face_count
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get_user_avatar_source: (source, base64_data) => dispatch(get_user_avatar_source(source, base64_data)),
    get_detected_face_count: (count) => dispatch(get_detected_face_count(count)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage2);
