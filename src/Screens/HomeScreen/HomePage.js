import React, {Component} from 'react';
import {
  View, Text, Image, TouchableOpacity, SafeAreaView, Alert, ScrollView,
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
import {GetUserPhotoFromImageLibrary} from '../../common/Functions/GetUserPhotoFromImageLibrary';
import {GetUserPhotoFromCamera} from '../../common/Functions/GetUserPhotoFromCamera';
import {RIGHT_HEADER_ICON} from '../../common/IconIndex';

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-9113500705436853/7410126783';
const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: false,
});
import AvatarComponent from '../../common/Components/AvatarComponent';
import ActionSheetComponent from '../../common/Components/ActionSheetComponent';
import {GetCategories} from "../../common/Functions/GetCategories";
import {DEVICE_HEIGHT, shadow} from "../../common/Constants";
import {UserPhotoAnalyze} from "../../common/Functions/UserPhotoAnalyze";
import {GetToken} from "../../common/Functions/GetToken";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
      loaded: false,
      setLoaded: false,
      result_loading: false,
      categories_visibility: false,
      categories: [],
      selected_category_name: translate("home.select_category"),
      selected_category_id: -1,
      scroll_items: [],
      celebrity: {}
    };
  }

  componentWillMount() {
    GetCategories(this.props.user_agent).then((res) => {
      console.log("Categories: ", res.data);
      this.setState({categories: res.data})

      this.fillScroll(res.data);
    });

    GetToken(this.props.user_agent).then((res) => {
      console.log("Token: ", res);
    });

    this.props.navigation.setOptions({
      title: translate('app_name'),
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('SavingsPage', {tab_index: 0})
          }>
          <Image source={RIGHT_HEADER_ICON}
                 style={{height: 35, width: 35, marginRight: 15}}/>
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

  LaunchCamera = async () => await GetUserPhotoFromCamera(this.props.get_user_avatar_source);

  LaunchImageLibrary = () => GetUserPhotoFromImageLibrary(this.props.get_user_avatar_source);

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
      <ActionSheetComponent launchImageLibrary={this.LaunchImageLibrary}
                            launchCamera={this.LaunchCamera}
                            handlePress={this.handlePress}
                            getActionSheetRef={this.getActionSheetRef}/>
    );
  };

  CheckValidity = () => {
    const {userAvatarSource} = this.props;

    if (userAvatarSource === '') {
      Alert.alert('', translate('famous_compare.validity_alert'));
      return false;
    }

    return true;
  };

  GetResult = async () => {
    const {userAvatarB64, user_agent} = this.props;
    const {selected_category_id} = this.state;

    if (this.CheckValidity()) {
      this.setState({result_loading: true});
      interstitial.onAdEvent((type) => {
        if (type !== AdEventType.LOADED) {
          interstitial.load();
        }
      });

      await UserPhotoAnalyze(user_agent, userAvatarB64, selected_category_id).then((res) => {
        console.log('UserPhotoAnalyze res: ', res);
        this.setState({celebrity: JSON.parse(res)});
        try {
          interstitial.show();
          this.props.navigation.navigate('ResultPage', {data: JSON.parse(res).data});
          this.setState({
            result_loading: false,
            selected_category_id: -1,
            selected_category_name: translate("home.select_category")
          });
        } catch (e) {
          console.log('error on response: ', e);
        }
      });
    }
  };

  fillScroll = (categories) => {
    const items = categories.map((item) => {
      return (
        <TouchableOpacity style={styles.scrollTextContainer}
                          onPress={() => this.CategorySelected(item.name, item.id)}>
          <Text style={styles.scrollTextStyle}>{item.name}</Text>
        </TouchableOpacity>
      );

    });
    this.setState({scroll_items: items});
  };

  CategorySelected = (category_name, category_id) => {
    this.setState({
      categories_visibility: false,
      selected_category_name: category_name,
      selected_category_id: category_id
    });
  }

  HandleCategoriesVisibility = () => {
    this.setState({categories_visibility: !this.state.categories_visibility});
  }

  CancelCategory = () => {
    this.setState({categories_visibility: false, selected_category_name: "Kategori Seç"});
  }

  render() {
    const {userAvatarSource} = this.props;
    const {categories_visibility, scroll_items, selected_category_name} = this.state;

    return (
      <View style={styles.backgroundImageStyle}>
        <SafeAreaView style={styles.mainContainer}>
          <View style={styles.labelsContainerStyle}>

            <View display={'flex'} style={styles.topLabel2ContainerStyle}>
              <TouchableOpacity style={[styles.categoryContainerStyle, shadow]}
                                onPress={() => this.HandleCategoriesVisibility()}>
                <Text style={styles.topLabel2Style}>{selected_category_name}</Text>
              </TouchableOpacity>

            </View>

            <View display={categories_visibility ? 'flex' : 'none'} style={{marginTop: 25, alignItems: 'center'}}>
              <ScrollView style={{maxHeight: DEVICE_HEIGHT * 0.6}}>
                <View style={styles.scrollViewStyle}>{scroll_items}</View>
              </ScrollView>
              <View display={selected_category_name !== "Kategori Seç" ? 'flex' : 'none'}>
                <Button title={"Temizle"}
                        buttonStyle={styles.cancelButtonStyle}
                        titleStyle={{fontSize: 18, fontWeight: '600'}}
                        onPress={() => this.CancelCategory()}
                        loading={this.state.result_loading}/>
              </View>

            </View>
          </View>

          <View display={!categories_visibility ? 'flex' : 'none'} style={styles.iconsMainContainerStyle}>
            <AvatarComponent ImageSource={userAvatarSource}
                             SelectAvatar={() => this.SelectAvatar()}/>
          </View>

          <View display={!categories_visibility ? 'flex' : 'none'}>
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
    get_user_avatar_source: (source, base64_data) => dispatch(get_user_avatar_source(source, base64_data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
