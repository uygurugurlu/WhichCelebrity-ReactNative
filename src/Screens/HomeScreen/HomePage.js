import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Platform,
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
import {
  get_detected_face_count,
  get_user_avatar_source,
} from '../../Store/Actions';
import {GetUserPhotoFromImageLibrary} from '../../common/Functions/GetUserPhotoFromImageLibrary';
import {GetUserPhotoFromCamera} from '../../common/Functions/GetUserPhotoFromCamera';
import {RIGHT_HEADER_ICON} from '../../common/IconIndex';
import AvatarComponent from '../../common/Components/AvatarComponent';
import ActionSheetComponent from '../../common/Components/ActionSheetComponent';
import {GetCategories} from '../../common/Functions/Endpoints/GetCategories';
import {
  DEVICE_HEIGHT,
  DOWN_ICON,
  FORWARD_ICON,
  WAIT_BEFORE_AD_MILLISECONDS,
  WAIT_LOADING_ANIMATION_MILLISECONDS,
} from '../../common/Constants';
import {UserPhotoAnalyze} from '../../common/Functions/Endpoints/UserPhotoAnalyze';
import Icon from 'react-native-fontawesome-pro';
import GenderSelection from '../../common/Components/GenderSelection';
import {GetToken} from '../../common/Functions/Endpoints/GetToken';
import {ShowSnackBar} from '../../common/Components/ShowSnackBar';
import {DetectFace} from '../../common/Functions/DetectFace';
import LoadingAnimationModal from '../../common/Components/LoadingAnimationModal/LoadingAnimationModal';
import {PerformTimeConsumingTask} from '../../common/Functions/PerformTimeConsumingTask';
import {
  CelebrityFinderResultEvent,
  SetCelebrityFinderScreenEvent,
} from '../../common/Functions/AnalyticEvents/Events';
import crashlytics from '@react-native-firebase/crashlytics';

const unit_id =
  Platform.OS === 'ios'
    ? 'ca-app-pub-9113500705436853/7410126783'
    : 'ca-app-pub-9113500705436853/6296695945';
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : unit_id;
const interstitial = InterstitialAd.createForAdRequest(adUnitId);

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
      selected_category_name: '',
      selected_category_id: -1,
      scroll_items: [],
      celebrity: {},
      gender: null,
      detected_faces: 0,
    };
  }

  componentWillMount = async () => {
    const {user_agent, language} = this.props;

    const token = await GetToken(user_agent);
    console.log('GetToken: ', token);

    try {
      const {data} = await GetCategories(user_agent, language.languageTag);
      console.log('Categories: ', data.data);
      this.setState({categories: data.data});
      this.fillScroll(data.data);
    } catch (e) {
      console.log('Error GetCategories: ', e.response);
      crashlytics().recordError(e);
    }

    this.props.navigation.setOptions({
      title: translate('app_name'),
      headerRight: () => (
        <TouchableOpacity onPress={this.NavigateToSavingsPage}>
          <Image
            source={RIGHT_HEADER_ICON}
            style={styles.headerRightButtonStyle}
          />
        </TouchableOpacity>
      ),
    });
  };

  componentDidMount = () => {
    //crashlytics().crash();
    SetCelebrityFinderScreenEvent();
    interstitial.load();
  };

  showActionSheet = () => this.actionSheet.show();

  getActionSheetRef = (ref) => (this.actionSheet = ref);

  handlePress = (index) => this.setState({selected: index});

  WhenTheLanguageChanged = () => this.forceUpdate();

  LaunchCamera = async () => {
    const {path, data} = await GetUserPhotoFromCamera();
    this.props.get_user_avatar_source({uri: path}, data);
    const faces = await DetectFace(path);
    this.props.get_detected_face_count(faces.length);
    console.log('faces:', faces, faces.length);
  };

  LaunchImageLibrary = async () => {
    const {path, data} = await GetUserPhotoFromImageLibrary();
    this.props.get_user_avatar_source({uri: path}, data);
    const faces = await DetectFace(path);
    this.props.get_detected_face_count(faces.length);
    console.log('faces:', faces, faces.length);
  };

  SelectAvatar = () => this.showActionSheet();

  NavigateToResultPage = (data) =>
    this.props.navigation.navigate('ResultPage', {data: data});

  NavigateToSavingsPage = () =>
    this.props.navigation.navigate('SavingsPage', {tab_index: 0});

  HandleCategoriesVisibility = () =>
    this.setState({categories_visibility: !this.state.categories_visibility});

  HandleGendersVisibility = () =>
    this.setState({genders_visibility: !this.state.genders_visibility});

  shouldComponentUpdate = async (nextProps, nextState) => {
    const {userAvatarSource, language} = this.props;
    if (nextProps.language.languageTag !== language.languageTag) {
      await this.WhenTheLanguageChanged();
    }

    if (userAvatarSource !== nextProps.userAvatarSource) {
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
    const {userAvatarSource, detected_face_count} = this.props;
    console.log('CheckValidity detected_faces: ', detected_face_count);

    if (userAvatarSource === '') {
      Alert.alert('', translate('famous_compare.validity_alert'));
      return false;
    } else if (detected_face_count === 0) {
      ShowSnackBar(translate('home.face_not_found'), 'LONG', 'TOP', 'ERROR');
      return false;
    } else if (detected_face_count > 1) {
      ShowSnackBar(
        translate('home.more_than_one_face_found'),
        'LONG',
        'TOP',
        'ERROR',
      );
      return false;
    }

    return true;
  };

  LoadAD = () => {
    interstitial.onAdEvent((type) => {
      if (type !== AdEventType.LOADED || type === AdEventType.CLOSED) {
        console.log(' AdEventType.LOADED: ', type === AdEventType.LOADED);
        console.log(' AdEventType.CLOSED: ', type === AdEventType.CLOSED);
        interstitial.load();
      }
    });
  };

  ShowAD = async () => {
    try {
      await interstitial.show();
    } catch (e) {
      console.log('Error ShowAD: ', e);
      crashlytics().recordError(e);
    }
  };

  GetResult = async () => {
    const {userAvatarB64, user_agent, language} = this.props;
    const {selected_category_id, gender, selected_category_name} = this.state;
    await this.LoadAD();

    if (this.CheckValidity()) {
      await this.setState({result_loading: true});

      try {
        const {data} = await UserPhotoAnalyze(
          user_agent,
          userAvatarB64,
          selected_category_id,
          language.languageTag,
          gender,
        );

        CelebrityFinderResultEvent(selected_category_name, gender);

        const wait = await PerformTimeConsumingTask(
          WAIT_LOADING_ANIMATION_MILLISECONDS,
        );
        if (wait !== null) {
          await this.setState({result_loading: false});
        }

        if (JSON.parse(data).status === 'error') {
          ShowSnackBar(JSON.parse(data).message, 'SHORT', 'TOP', 'ERROR');
        } else {
          const data_xx = await PerformTimeConsumingTask(
            WAIT_BEFORE_AD_MILLISECONDS,
          );
          if (data_xx !== null) {
            await this.ShowAD();
          }
          this.setState({celebrity: JSON.parse(data)});
          this.NavigateToResultPage(JSON.parse(data).data);
        }
        this.CancelCategory();
      } catch (e) {
        console.log('error on response: ', e);
        crashlytics().recordError(e);
        ShowSnackBar(
          translate('home.result_not_found'),
          'SHORT',
          'TOP',
          'ERROR',
        );
      }

      this.setState({result_loading: false});
    }
  };

  fillScroll = (categories) => {
    const items = categories.map((item) => {
      return (
        <TouchableOpacity
          style={styles.scrollTextContainer}
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
      selected_category_id: category_id,
    });
  };

  CancelCategory = () => {
    this.setState({
      categories_visibility: false,
      genders_visibility: false,
      selected_category_name: '',
      selected_category_id: -1,
    });
  };

  FilterItems = (filter_line) => {
    const {categories} = this.state;

    const filtered_categories = categories.filter((item) => {
      return item.name.includes(filter_line);
    });

    this.fillScroll(filtered_categories);
  };

  onChangeText = (key, value) => {
    this.setState({[key]: value});

    if (value === '') {
      this.setState({categories_visibility: false});
    } else {
      this.setState({categories_visibility: true});
    }

    this.FilterItems(value);
  };

  SelectGender = (gender) => {
    this.HandleGendersVisibility();
    this.setState({gender: gender});
  };

  render() {
    const {userAvatarSource} = this.props;
    const {
      categories_visibility,
      scroll_items,
      selected_category_name,
      genders_visibility,
    } = this.state;

    return (
      <TouchableWithoutFeedback
        style={styles.backgroundImageStyle}
        onPress={this.CancelCategory}>
        <SafeAreaView style={styles.mainContainer}>
          <View style={styles.labelsContainerStyle}>
            <View>
              <Text style={styles.topLabelStyle}>
                {translate('home.top_label')}
              </Text>

              <View display={'flex'} style={styles.topLabel2ContainerStyle}>
                <TouchableOpacity
                  style={styles.categoryContainerStyle}
                  onPress={this.HandleCategoriesVisibility}>
                  <TextInput
                    style={styles.topLabel2Style}
                    onChangeText={(value) =>
                      this.onChangeText('selected_category_name', value)
                    }
                    autoFocus={false}
                    placeholder={translate('home.select_category')}
                    placeholderTextColor={'#959595'}
                    value={selected_category_name}
                  />

                  <View
                    display={selected_category_name === '' ? 'flex' : 'none'}>
                    <Image
                      source={categories_visibility ? DOWN_ICON : FORWARD_ICON}
                      style={{height: 25, width: 25}}
                    />
                  </View>

                  <View
                    display={selected_category_name !== '' ? 'flex' : 'none'}
                    style={{marginRight: 5}}>
                    <TouchableOpacity onPress={this.CancelCategory}>
                      <Icon
                        name={'times'}
                        size={25}
                        type={'light'}
                        color={'white'}
                        containerStyle={styles.cancelIconContainerStyle}
                      />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <GenderSelection
              SelectGender={this.SelectGender}
              visibility={genders_visibility}
              categoriesVisibility={categories_visibility}
              handleVisibilitty={this.HandleGendersVisibility}
            />

            <View
              display={categories_visibility ? 'flex' : 'none'}
              style={{alignItems: 'center'}}>
              <ScrollView style={{maxHeight: DEVICE_HEIGHT * 0.55}}>
                <View style={styles.scrollViewStyle}>{scroll_items}</View>
              </ScrollView>
            </View>
          </View>

          <View
            display={
              !categories_visibility && !genders_visibility ? 'flex' : 'none'
            }
            style={styles.iconsMainContainerStyle}>
            <AvatarComponent
              ImageSource={userAvatarSource}
              SelectAvatar={this.SelectAvatar}
              showEditButton={true}
            />
          </View>

          <View
            display={
              !categories_visibility && !genders_visibility ? 'flex' : 'none'
            }>
            <Button
              title={translate('home.get_result')}
              buttonStyle={styles.resultButtonStyle}
              titleStyle={{fontSize: 18, fontWeight: '600'}}
              onPress={this.GetResult}
              loading={this.state.result_loading}
            />
          </View>

          {this.GetActionSheet()}
          {<LoadingAnimationModal isModalVisible={this.state.result_loading}/>}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.mainReducer.language,
    userAvatarSource: state.mainReducer.userAvatarSource,
    userAvatarB64: state.mainReducer.userAvatarB64,
    user_agent: state.mainReducer.user_agent,
    detected_face_count: state.mainReducer.detected_face_count,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get_user_avatar_source: (source, base64_data) =>
      dispatch(get_user_avatar_source(source, base64_data)),
    get_detected_face_count: (count) =>
      dispatch(get_detected_face_count(count)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
