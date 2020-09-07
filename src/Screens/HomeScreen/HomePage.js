import React, {Component} from 'react';
import {
  View, Text, Image, TouchableOpacity, SafeAreaView, Alert, ScrollView, TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import {translate} from '../../I18n';
import {Button} from 'react-native-elements';
import {styles} from './HomePageStyles';
import {InterstitialAd, AdEventType, TestIds} from '@react-native-firebase/admob';
import {get_user_avatar_source} from '../../Store/Actions';
import {GetUserPhotoFromImageLibrary} from '../../common/Functions/GetUserPhotoFromImageLibrary';
import {GetUserPhotoFromCamera} from '../../common/Functions/GetUserPhotoFromCamera';
import {RIGHT_HEADER_ICON} from '../../common/IconIndex';
import AvatarComponent from '../../common/Components/AvatarComponent';
import ActionSheetComponent from '../../common/Components/ActionSheetComponent';
import {GetCategories} from "../../common/Functions/Endpoints/GetCategories";
import {DEVICE_HEIGHT, DOWN_ICON, FORWARD_ICON} from "../../common/Constants";
import {UserPhotoAnalyze} from "../../common/Functions/Endpoints/UserPhotoAnalyze";
import Icon from "react-native-fontawesome-pro";
import GenderSelection from "../../common/Components/GenderSelection";

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-9113500705436853/7410126783';
const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: false,
});

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
      loaded: false,
      setLoaded: false,
      result_loading: false,
      categories_visibility: false,
      genders_visibility: false,
      categories: [],
      selected_category_name: "",
      selected_category_id: -1,
      scroll_items: [],
      celebrity: {},
      gender: null
    };
  }

  componentWillMount() {
    GetCategories(this.props.user_agent, this.props.language.languageTag).then((res) => {
      console.log("Categories: ", res.data);
      this.setState({categories: res.data})
      this.fillScroll(res.data);
    });

    /*GetToken().then((res) => {
      console.log("Res: ", res);
    });*/

    this.props.navigation.setOptions({
      title: translate('app_name'),
      headerRight: () => (
        <TouchableOpacity onPress={() =>
          this.props.navigation.navigate('SavingsPage', {tab_index: 0})}>
          <Image source={RIGHT_HEADER_ICON} style={{height: 35, width: 35, marginRight: 15}}/>
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
    const {userAvatarB64, user_agent, language} = this.props;
    const {selected_category_id, gender} = this.state;

    if (this.CheckValidity()) {
      this.setState({result_loading: true});
      interstitial.onAdEvent((type) => {
        if (type !== AdEventType.LOADED) {
          interstitial.load();
        }
      });

      await UserPhotoAnalyze(user_agent, userAvatarB64, selected_category_id, language.languageTag, gender).then((res) => {
        console.log('UserPhotoAnalyze res: ', JSON.parse(res));
        try {
          if (JSON.parse(res).status === 'error') {
            Alert.alert(JSON.parse(res).message);
          } else {
            this.setState({celebrity: JSON.parse(res)});
            interstitial.show();
            this.props.navigation.navigate('ResultPage', {data: JSON.parse(res).data});
          }

          this.setState({result_loading: false});
          this.CancelCategory();
        } catch (e) {
          console.log('error on response: ', e);
        }
      });
    }
  };

  fillScroll = (categories) => {
    const items = categories.map((item) => {
      return (
        <TouchableOpacity style={styles.scrollTextContainer} onPress={() => this.CategorySelected(item.name, item.id)}>
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

  HandleGendersVisibility = () => {
    this.setState({genders_visibility: !this.state.genders_visibility});
  }

  CancelCategory = () => {
    this.setState({
      categories_visibility: false,
      selected_category_name: "",
      selected_category_id: -1,
      gender: null
    });
  }

  FilterItems = (filter_line) => {
    const {categories} = this.state;

    const filtered_categories = categories.filter((item) => {
      return item.name.includes(filter_line);
    });

    this.fillScroll(filtered_categories);
  };

  onChangeText = (key, value) => {
    this.setState({
      [key]: value,
    });

    if (value === "")
      this.setState({categories_visibility: false});
    else
      this.setState({categories_visibility: true});

    this.FilterItems(value);
  };

  SelectGender = (gender) => {
    this.HandleGendersVisibility();
    this.setState({gender: gender});
  };

  render() {
    const {userAvatarSource} = this.props;
    const {categories_visibility, scroll_items, selected_category_name, genders_visibility} = this.state;

    return (
      <View style={styles.backgroundImageStyle}>
        <SafeAreaView style={styles.mainContainer}>
          <View style={styles.labelsContainerStyle}>

            <View>
              <Text style={styles.topLabelStyle}>{translate("home.top_label")}</Text>

              <View display={'flex'} style={styles.topLabel2ContainerStyle}>
                <TouchableOpacity style={styles.categoryContainerStyle}
                                  onPress={() => this.HandleCategoriesVisibility()}>
                  <TextInput style={styles.topLabel2Style}
                             onChangeText={(value) => this.onChangeText('selected_category_name', value)}
                             autoFocus={false}
                             placeholder={translate("home.select_category")}
                             placeholderTextColor={'#959595'}
                             value={selected_category_name}/>

                  <View display={selected_category_name === "" ? 'flex' : 'none'}>
                    <Image source={categories_visibility ? DOWN_ICON : FORWARD_ICON} style={{height: 25, width: 25}}/>
                  </View>

                  <View display={selected_category_name !== "" ? 'flex' : 'none'} style={{marginRight: 5}}>
                    <TouchableOpacity onPress={() => this.CancelCategory()}>
                      <Icon name={'times'} size={25} type={'light'} color={'white'}
                            containerStyle={styles.cancelIconContainerStyle}/>
                    </TouchableOpacity>
                  </View>

                </TouchableOpacity>
              </View>
            </View>
            <GenderSelection SelectGender={this.SelectGender}
                             visibility={genders_visibility}
                             categoriesVisibility={categories_visibility}
                             handleVisibilitty={() => this.HandleGendersVisibility()}/>

            <View display={categories_visibility ? 'flex' : 'none'} style={{alignItems: 'center'}}>
              <ScrollView style={{maxHeight: DEVICE_HEIGHT * 0.55}}>
                <View style={styles.scrollViewStyle}>{scroll_items}</View>
              </ScrollView>
            </View>
          </View>

          <View display={!categories_visibility && !genders_visibility ? 'flex' : 'none'}
                style={styles.iconsMainContainerStyle}>
            <AvatarComponent ImageSource={userAvatarSource} SelectAvatar={() => this.SelectAvatar()}
                             showEditButton={true}/>
          </View>

          <View display={!categories_visibility && !genders_visibility ? 'flex' : 'none'}>
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
