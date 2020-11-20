import React, { Component } from 'react';
import {
  Alert,
  FlatList,
  ImageBackground,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { Button, Icon, SearchBar } from 'react-native-elements';
import { AdEventType, InterstitialAd, TestIds, } from '@react-native-firebase/admob';
import RNFS from 'react-native-fs';
import crashlytics from '@react-native-firebase/crashlytics';
import ImagePicker from 'react-native-image-picker';
import { CropView } from 'react-native-image-crop-tools';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import { translate } from '../../I18n';
import { styles } from './HomePageStyles';
import {
  get_detected_face_count, get_user_avatar_source, unauthenticate_user, set_auth_token
} from '../../Store/Actions';
import AvatarComponent from '../../common/Components/AvatarComponent';
import { GetCategories } from '../../common/Functions/Endpoints/GetCategories';
import { IMAGEBACK, WAIT_BEFORE_AD_MILLISECONDS, WAIT_LOADING_ANIMATION_MILLISECONDS, } from '../../common/Constants';
import { UserPhotoAnalyze } from '../../common/Functions/Endpoints/UserPhotoAnalyze';
import { ShowSnackBar } from '../../common/Components/ShowSnackBar';
import { DetectFace } from '../../common/Functions/DetectFace';
import LoadingAnimationModal from '../../common/Components/LoadingAnimationModal/LoadingAnimationModal';
import { PerformTimeConsumingTask } from '../../common/Functions/PerformTimeConsumingTask';
import { CelebrityFinderResultEvent, SetCelebrityFinderScreenEvent, } from '../../common/Functions/AnalyticEvents/Events';
import { LogoutUser } from '../../common/Functions/Endpoints/LogoutUser';
import { storeData } from '../../common/Functions/ManageAsyncData';
import { AUTH_TOKEN } from '../../config';
import ImageResizer from 'react-native-image-resizer'
import CameraRoll from '@react-native-community/cameraroll'

const options = {
  quality: 0.8,
  maxWidth: 1000,
  maxHeight: 1000,
  noData: true,
  storageOptions: {
    skipBackup: true,
    path: 'images',

  },
};
const unit_id = Platform.OS === 'ios'
  ? 'ca-app-pub-9113500705436853/7410126783'
  : 'ca-app-pub-9113500705436853/6296695945';
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : unit_id;
const interstitial = InterstitialAd.createForAdRequest(adUnitId);
let OriginalCategories;

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
      genderText: '',
      categories: [],
      selected_category_name: '',
      selected_category_id: -1,
      scroll_items: [],
      celebrity: {},
      gender: null,
      detected_faces: 0,
      optionsModalVisible: false,
      crop_visibility: false,
      imageUri: '',
      croppedImage: '',
    };
    this.cropViewRef = React.createRef();
  }

  handleSignOut = async () => {
    try {
      Alert.alert(translate('error.time_out'));

      auth()
        .signOut()
        .then(() => console.log('User signed out!'));
      const loggedOut = await LogoutUser(this.props.auth_token);
      if (loggedOut.status !== 200) throw 'Server error signing out';
      this.props.unauthenticate_user();
      AsyncStorage.removeItem('@UserInfo');
      storeData('@auth_token', AUTH_TOKEN);
      this.props.set_auth_token(AUTH_TOKEN);
      this.props.navigation.goBack();
    } catch (error) {
      Alert.alert(translate('error.time_out'));
      console.log('error signing out: ', error);
      this.props.unauthenticate_user();
      AsyncStorage.removeItem('@UserInfo');
      AsyncStorage.removeItem('@auth_token');
      this.props.set_auth_token(AUTH_TOKEN);
    }
  };

  componentWillMount = async () => {
    const { user_agent, language, auth_token } = this.props;

    try {
      const { data } = await GetCategories(user_agent, language.languageTag, this.props.auth_token);
      console.log('Categories: ', data);
      data.data.unshift({ id: -1, name: translate('home.none') });
      this.setState({ categories: data.data });
      OriginalCategories = data.data;
      this.fillScroll(data.data);
    } catch (e) {
      console.log('Error GetCategories: ', e.response);
      crashlytics().recordError(e);
      if (e.status == 401) {
        this.handleSignOut();
        Alert.alert(translate('error.time_out'));
        this.props.navigation.goBack();
      }
    }

    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ justifyContent: 'center' }} onPress={this.NavigateToSavingsPage}>
          <Icon
            name="photo-library"
            color="white"
            style={{
              height: 35, width: 35, marginRight: 15, alignSelf: 'center'
            }}
          />
        </TouchableOpacity>
      ),
    });
  };

  componentDidMount = () => {
    // crashlytics().crash();
    SetCelebrityFinderScreenEvent();
    interstitial.load();
  };

  handlePress = (index) => this.setState({ selected: index });

  LaunchCamera = async () => {
    /* const {path, data} = await GetUserPhotoFromCamera();
    this.props.get_user_avatar_source({uri: path}, data);
    const faces = await DetectFace(path);
    this.props.get_detected_face_count(faces.length);
    console.log('faces:', faces, faces.length); */
    await this.setState({ optionsModalVisible: false });
    ImagePicker.launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState({ crop_visibility: true, imageUri: response.uri });
      }
    });
  };

  LaunchImageLibrary = async () => {
    await this.setState({ optionsModalVisible: false });
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState({ crop_visibility: true, imageUri: response.uri });
      }
    });
  };

  handleCroppedImage = async (res) => {
    const data = await RNFS.readFile(res.uri, 'base64');
    this.props.get_user_avatar_source({ uri: res.uri }, data);
    const faces = await DetectFace(res.uri);
    this.setState({ crop_visibility: false });
    this.props.get_detected_face_count(faces.length);

  }

  SelectAvatar = () => this.setState({ optionsModalVisible: true });

  NavigateToResultPage = (data) => this.props.navigation.navigate('ResultPage', { data });

  NavigateToSavingsPage = () => {
    this.props.navigation.navigate('SavingsPage', { tab_index: 0 });
  }

  HandleCategoriesVisibility = () => this.setState({ categories_visibility: !this.state.categories_visibility });

  HandleGendersVisibility = () => this.setState({ genders_visibility: !this.state.genders_visibility });

  shouldComponentUpdate = async (nextProps, nextState) => {
    const { language } = this.props;
    if (nextProps.language.languageTag !== language.languageTag) {
      await this.WhenTheLanguageChanged();
    }
  };

  CheckValidity = () => {
    const { userAvatarSource, detected_face_count } = this.props;
    console.log('CheckValidity detected_faces: ', detected_face_count);

    if (userAvatarSource === '') {
      Alert.alert('', translate('famous_compare.validity_alert'));
      return false;
    } if (detected_face_count === 0) {
      ShowSnackBar(translate('home.face_not_found'), 'LONG', 'TOP', 'ERROR');
      return false;
    } if (detected_face_count > 1) {
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
    const {
      userAvatarB64, user_agent, language, auth_token
    } = this.props;
    const { selected_category_id, gender, selected_category_name } = this.state;
    await this.LoadAD();
    if (this.CheckValidity()) {
      await this.setState({ result_loading: true });

      try {
        const { data } = await UserPhotoAnalyze(
          user_agent,
          userAvatarB64,
          selected_category_id,
          language.languageTag,
          gender,
          auth_token,
        );

        console.log('photo analyze result: ', data);
        CelebrityFinderResultEvent(selected_category_name, gender);

        const wait = await PerformTimeConsumingTask(
          WAIT_LOADING_ANIMATION_MILLISECONDS,
        );
        if (wait !== null) {
          await this.setState({ result_loading: false });
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
          this.setState({ celebrity: JSON.parse(data) });
          this.NavigateToResultPage(JSON.parse(data).data);
        }
        this.CancelCategory();
      } catch (e) {
        if (e.response.status == 401) {
          await this.handleSignOut();
        }
        console.log('error on response: ', e);
        crashlytics().recordError(e);
        ShowSnackBar(
          translate('home.result_not_found'),
          'SHORT',
          'TOP',
          'ERROR',
        );
      }

      this.setState({ result_loading: false });
    }
  };

  CategorySelected = (category_name, category_id) => {
    this.setState({
      categories_visibility: false,
      selected_category_name: category_name,
      selected_category_id: category_id,
    });
    if (category_id == -1) {
      this.CancelCategory();
    }
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
    const { categories } = this.state;
    if (!filter_line) {
      this.setState({ categories: OriginalCategories });
    } else {
      const filtered_categories = OriginalCategories.filter((item) => item.name.toLowerCase().includes(filter_line.toLowerCase()));
      this.setState({ categories: filtered_categories });
    }
  };

  onChangeText = (key, value) => {
    this.setState({ [key]: value });

    if (value === '') {
      this.setState({
        categories: OriginalCategories,
      });
    } else {
      this.setState({ categories_visibility: true });
    }

    this.FilterItems(value);
  };

  SelectGender = (gender, genderText) => {
    this.setState({ gender, genderText });
  };
  handleSaveImage = () => {
    this.cropViewRef.current.saveImage(true, 100);
  };
  render() {
    const genders = [
      { label: translate('home.search_for_all'), id: 1, type: null },
      { label: translate('home.search_male_celebrities'), id: 2, type: 'male' },
      { label: translate('home.search_female_celebrities'), id: 3, type: 'female' },
    ];
    const { userAvatarSource, unauthenticate_user } = this.props;
    const {
      categories_visibility,
      scroll_items,
      selected_category_name,
      genders_visibility,
      genderText,
      result_loading,
    } = this.state;

    return (
      <View style={styles.mainContainer}>
        <ImageBackground style={styles.imageBack} source={IMAGEBACK}>
          <View style={styles.topLabelContainerStyle}>
            <Text style={styles.topLabelStyle}>
              {translate('home.top_label')}
            </Text>

            <TouchableOpacity
              style={styles.selectCategoryContainer}
              onPress={() => this.setState({ categories_visibility: true })}
            >
              <View style={styles.selectCategoryWrapper}>
                <Text style={styles.selectCategoryText}>
                  {selected_category_name == ''
                    ? translate('home.select_category')
                    : selected_category_name}
                </Text>
                <Icon
                  name="keyboard-arrow-right"
                  color="#284077"
                  style={styles.selectCategoryIcon}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.selectCategoryContainer}
              onPress={() => this.setState({ genders_visibility: true })}
            >
              <View style={styles.selectCategoryWrapper}>
                <Text style={styles.selectCategoryText}>
                  {!genderText
                    ? translate('home.search_for_all')
                    : genderText}
                </Text>
                <Icon
                  name="keyboard-arrow-right"
                  color="#284077"
                  style={styles.selectCategoryIcon}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.cameraContainer}>
            <AvatarComponent
              ImageSource={userAvatarSource}
              SelectAvatar={this.SelectAvatar}
              showEditButton
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title={translate('home.get_result')}
              buttonStyle={styles.button}
              onPress={this.GetResult}
              loading={result_loading}
            />
          </View>
          {
            // Options Modal Start
          }
          <Modal
            visible={this.state.optionsModalVisible}
            transparent
            animationType="slide"
          >

            <TouchableOpacity onPress={() => this.setState({optionsModalVisible: false})} style={styles.bottomModal}>
              <View style={styles.settingsModalContainer}>
                <TouchableOpacity
                  onPress={async () => {

                    await this.setState({optionsModalVisible: false});
                    await setTimeout(() => {this.LaunchCamera();}, 200);
                  }}
                  style={styles.settingsMainButtons}
                >
                  <Text style={styles.settingsButton}>{translate('image_picker.use_camera')}</Text>
                  <Icon
                    name="camera-alt"
                    color="#1a84f4"
                    style={{ margin: 4, alignSelf: 'center' }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={async () => {
                    await this.setState({optionsModalVisible: false});
                    await setTimeout(() => {this.LaunchImageLibrary();}, 200);
                  }}
                  style={styles.settingsMainButtons}
                >
                  <Text style={styles.settingsButton}>{translate('image_picker.photo_library')}</Text>
                  <Icon
                    name="photo-library"
                    color="#1a84f4"
                    style={{ margin: 4, alignSelf: 'center' }}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => this.setState({ optionsModalVisible: false })}
                style={styles.cancelButtonContainer}
              >
                <Text style={styles.cancelButton}>{translate('image_picker.cancel')}</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </Modal>
          {
            // Options Modal End
          }
          {
            // Crop Modal Start
          }
          <Modal visible={this.state.crop_visibility} transparent={false}>
            <View style={styles.mainContainer}>

              <CropView
                sourceUrl={
                  this.state.imageUri === ''
                    ? '../assets/icons/CameraFrame.png'
                    : this.state.imageUri
                }
                style={styles.cropView}
                ref={this.cropViewRef}
                onImageCrop={(res) => this.handleCroppedImage(res)}

              />
              <View style={styles.cropButtonsContainer}>
                <View style={styles.cropButtonContainer}>
                  <TouchableOpacity
                    style={styles.cropWrapper}
                    onPress={() => this.setState({ crop_visibility: false })}
                  >
                    <Icon color="white" name="close" />
                  </TouchableOpacity>
                </View>
                <View style={styles.cropButtonContainer}>
                  <TouchableOpacity
                    style={styles.cropWrapper}
                    onPress={() => this.handleSaveImage()}
                  >
                    <Icon color="white" name="check" />
                  </TouchableOpacity>
                </View>

              </View>

            </View>

          </Modal>
          {
            // Crop Modal End
          }
          {
            // Categories Modal Start
          }

          <Modal
            visible={this.state.categories_visibility}
            transparent
            animationType="slide"
          >
            <TouchableOpacity onPress={() => this.setState({categories_visibility: false})} style={styles.bottomModal}>
              <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                  <View style={styles.headerContainer}>
                    <Text style={styles.modalHeaderTitle}>
                      {translate('home.select_category')}
                    </Text>
                    <TouchableOpacity
                      style={styles.ModalCloseButton}
                      onPress={() => this.setState({ categories_visibility: false })}
                    >
                      <Icon name="close" color="#517fa4" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.categoryListContainer}>
                  <SearchBar
                    onChangeText={(value) => this.onChangeText('selected_category_name', value)}
                    value={this.state.selected_category_name}
                    placeholder={translate('home.search_category')}
                    lightTheme
                    round
                  />
                  <FlatList
                    keyboardShouldPersistTaps="handled"
                    data={this.state.categories}
                    keyExtractor={(category) => category.id.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={{
                          backgroundColor:
                              this.state.selected_category_id == item.id
                                ? '#4598e6'
                                : '#fff',
                        }}
                        onPress={() => {
                          this.CategorySelected(item.name, item.id);
                        }}
                      >
                        <View
                          style={{
                            borderBottomWidth: 0.5,
                            borderColor: 'rgb(150,150,150)',
                          }}
                        >
                          <Text style={styles.categoriesListText}>
                            {item.name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </Modal>
          {
            // Categories Modal End
          }
          {
            // Gender Modal Start
          }

          <Modal
            visible={this.state.genders_visibility}
            transparent
            animationType="slide"
          >

            <TouchableOpacity onPress={() => this.setState({genders_visibility: false})} style={styles.bottomModal}>
              <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                  <View style={styles.headerContainer}>
                    <Text style={styles.modalHeaderTitle}>
                      {translate('home.search_gender')}
                    </Text>
                    <TouchableOpacity
                      style={styles.ModalCloseButton}
                      onPress={() => this.setState({ genders_visibility: false })}
                    >
                      <Icon name="close" color="#517fa4" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.categoryListContainerNoHeight}>
                  <FlatList
                    keyboardShouldPersistTaps="handled"
                    data={genders}
                    keyExtractor={(gender) => gender.id.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={{
                          backgroundColor:
                              this.state.gender == item.type
                                ? '#4598e6'
                                : '#fff',
                        }}
                        onPress={() => {
                          this.setState({
                            genders_visibility: false,
                          });
                          this.SelectGender(item.type, item.label);
                        }}
                      >
                        <View style={styles.modalItem}>
                          <Text style={styles.categoriesListText}>
                            {item.label}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </Modal>
          {
            // Gender Modal End
          }
          {<LoadingAnimationModal text={translate('home.loading_text')} isModalVisible={result_loading} />}
        </ImageBackground>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  language: state.mainReducer.language,
  userAvatarSource: state.mainReducer.userAvatarSource,
  userAvatarB64: state.mainReducer.userAvatarB64,
  user_agent: state.mainReducer.user_agent,
  detected_face_count: state.mainReducer.detected_face_count,
  auth_token: state.mainReducer.auth_token,
});

const mapDispatchToProps = (dispatch) => ({
  get_user_avatar_source: (source, base64_data) => dispatch(get_user_avatar_source(source, base64_data)),
  get_detected_face_count: (count) => dispatch(get_detected_face_count(count)),
  unauthenticate_user: () => dispatch(unauthenticate_user()),
  set_auth_token: (auth_token) => dispatch(set_auth_token(auth_token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
