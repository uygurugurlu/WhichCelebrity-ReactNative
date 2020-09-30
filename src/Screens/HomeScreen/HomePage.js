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
  ImageBackground,
  TouchableHighlight,
  Modal,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import {translate} from '../../I18n';
import {Button, SearchBar} from 'react-native-elements';
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
import {ConvertImageBase64} from '../../common/Functions/ConvertImageBase64';
import {RIGHT_HEADER_ICON} from '../../common/IconIndex';
import AvatarComponent from '../../common/Components/AvatarComponent';
import ActionSheetComponent from '../../common/Components/ActionSheetComponent';
import {GetCategories} from '../../common/Functions/Endpoints/GetCategories';
import {Icon} from 'react-native-elements';
import RNFS from 'react-native-fs';

import {
  DEVICE_HEIGHT,
  DOWN_ICON,
  FORWARD_ICON,
  WAIT_BEFORE_AD_MILLISECONDS,
  WAIT_LOADING_ANIMATION_MILLISECONDS,
  IMAGEBACK,
  CAMERAFRAME,
  CAMERAICON,
} from '../../common/Constants';
import {UserPhotoAnalyze} from '../../common/Functions/Endpoints/UserPhotoAnalyze';
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
import ImagePicker from 'react-native-image-picker';
import {CropView} from 'react-native-image-crop-tools';

const options = {
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
const unit_id =
  Platform.OS === 'ios'
    ? 'ca-app-pub-9113500705436853/7410126783'
    : 'ca-app-pub-9113500705436853/6296695945';
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : unit_id;
const interstitial = InterstitialAd.createForAdRequest(adUnitId);
var OriginalCategories;
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
      optionsModalVisible: false,
      crop_visibility: false,
      imageUri: '',
      croppedImage: '',
    };
    this.cropViewRef = React.createRef();
  }

  componentWillMount = async () => {
    const {user_agent, language} = this.props;

    const token = await GetToken(user_agent);
    console.log('GetToken: ', token);

    try {
      const {data} = await GetCategories(user_agent, language.languageTag);
      //console.log('Categories: ', data.data);
      data.data.unshift({id: -1, name: translate('home.none')});
      this.setState({categories: data.data});
      OriginalCategories = data.data;
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

  LaunchCamera() {
    /* const {path, data} = await GetUserPhotoFromCamera();
    this.props.get_user_avatar_source({uri: path}, data);
    const faces = await DetectFace(path);
    this.props.get_detected_face_count(faces.length);
    console.log('faces:', faces, faces.length); */

    ImagePicker.launchCamera(options, (response) => {

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState({crop_visibility: true, imageUri: response.uri});
      }
    });
  }
  LaunchImageLibrary = async () => {
    ImagePicker.launchImageLibrary(options, (response) => {

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState({crop_visibility: true, imageUri: response.uri});
      }
    });
  };
  handleCroppedImage = async (res) => {
    var data = await RNFS.readFile(res.uri, 'base64')
    console.log('base64Image: ',data);
    this.props.get_user_avatar_source({uri: res.uri}, data);
    const faces = await DetectFace(res.uri);  
    this.setState({crop_visibility: false});
    this.props.get_detected_face_count(faces.length);
    console.log('faces:', faces, faces.length);
  }
  -//SelectAvatar = () => this.showActionSheet();
  SelectAvatar = () => this.setState({optionsModalVisible: true});

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
    console.log('getResultBase64: ', userAvatarB64);
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
    const {categories} = this.state;
    if (!filter_line) {
      this.setState({categories: OriginalCategories});
    } else {
      var filtered_categories = OriginalCategories.filter((item) => {
        return item.name.toLowerCase().includes(filter_line.toLowerCase());
      });
      this.setState({categories: filtered_categories});
    }
  };

  onChangeText = (key, value) => {
    this.setState({[key]: value});

    if (value === '') {
      this.setState({
        categories: OriginalCategories,
      });
    } else {
      this.setState({categories_visibility: true});
    }

    this.FilterItems(value);
  };

  SelectGender = (gender) => {
    this.setState({gender: gender});
  };

  render() {
    let genders = [
      {name: translate('home.search_for_all'), id: 1},
      {name: translate('home.search_male_celebrities'), id: 2},
      {name: translate('home.search_female_celebrities'), id: 3},
    ];
    const {userAvatarSource} = this.props;
    const {
      categories_visibility,
      scroll_items,
      selected_category_name,
      genders_visibility,
    } = this.state;

    return (
      <View style={styles.mainContainer}>
        <ImageBackground style={styles.imageBack} source={IMAGEBACK}>
          <View style={styles.topLabelContainerStyle}>
            <Text style={styles.topLabelStyle}>
              {translate('home.top_label')}
            </Text>

            <TouchableHighlight
              style={styles.selectCategoryContainer}
              onPress={() => this.setState({categories_visibility: true})}>
              <View style={styles.selectCategoryWrapper}>
                <Text style={styles.selectCategoryText}>
                  {this.state.selected_category_name == ''
                    ? translate('home.select_category')
                    : this.state.selected_category_name}
                </Text>
                <Icon
                  name="keyboard-arrow-right"
                  color="#284077"
                  style={styles.selectCategoryIcon}
                />
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.selectCategoryContainer}
              onPress={() => this.setState({genders_visibility: true})}>
              <View style={styles.selectCategoryWrapper}>
                <Text style={styles.selectCategoryText}>
                  {!this.state.gender
                    ? translate('home.search_for_all')
                    : this.state.gender}
                </Text>
                <Icon
                  name="keyboard-arrow-right"
                  color="#284077"
                  style={styles.selectCategoryIcon}
                />
              </View>
            </TouchableHighlight>
          </View>

          <View style={styles.cameraContainer}>
            <AvatarComponent
              ImageSource={userAvatarSource}
              SelectAvatar={this.SelectAvatar}
              showEditButton={true}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title={translate('home.get_result')}
              buttonStyle={styles.button}
              onPress={this.GetResult}
              loading={this.state.result_loading}
            />
          </View>
          {
            //Options Modal Start
          }
          <Modal
            visible={this.state.optionsModalVisible}
            transparent={true}
            animationType="slide">
            <TouchableOpacity
              style={styles.modalBack}
              onPress={() => this.setState({optionsModalVisible: false})}
            />

            <View style={styles.bottomModal}>
              <View style={styles.settingsModalContainer}>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({optionsModalVisible: false}, () =>
                      this.LaunchCamera(),
                    )
                  }
                  style={styles.settingsMainButtons}>
                  <Text style={styles.settingsButton}>Kamerayı aç</Text>
                  <Icon
                    name="camera-alt"
                    color="#1a84f4"
                    style={{margin: 4, alignSelf: 'center'}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({optionsModalVisible: false}, () =>
                      this.LaunchImageLibrary(),
                    )
                  }
                  style={styles.settingsMainButtons}>
                  <Text style={styles.settingsButton}>Galeriden seç</Text>
                  <Icon
                    name="photo-library"
                    color="#1a84f4"
                    style={{margin: 4, alignSelf: 'center'}}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => this.setState({optionsModalVisible: false})}
                style={styles.cancelButtonContainer}>
                <Text style={styles.cancelButton}>İptal Et</Text>
              </TouchableOpacity>
            </View>
          </Modal>
          {
            //Options Modal End
          }
          {
            //Crop Modal Start
          }
          <Modal visible={this.state.crop_visibility} transparent={false}>
          <View style={styles.mainContainer}>

          <CropView
              sourceUrl={
                this.state.imageUri == ''
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
              onPress={() => this.setState({crop_visibility: false})}>
              <Icon color={'white'} name={'close'}/>
            </TouchableOpacity>
            </View>
            <View style={styles.cropButtonContainer}>
            <TouchableOpacity
              style={styles.cropWrapper}
              onPress={() => this.cropViewRef.current.saveImage(true,30)}>
              <Icon color={'white'} name={'check'}/>
            </TouchableOpacity>
            </View>

           
            </View>
             
          </View>
            
           
          </Modal>
          {
            //Crop Modal End
          }
          {
            //Categories Modal Start
          }

          <Modal
            visible={this.state.categories_visibility}
            transparent={true}
            animationType="slide">
            <TouchableOpacity
              style={styles.modalBack}
              onPress={() => this.setState({categories_visibility: false})}
            />
            <View style={styles.bottomModal}>
              <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                  <View style={styles.headerContainer}>
                    <Text style={styles.modalHeaderTitle}>
                      {translate('home.select_category')}
                    </Text>
                    <TouchableOpacity
                      style={styles.ModalCloseButton}
                      onPress={() =>
                        this.setState({categories_visibility: false})
                      }>
                      <Icon name="close" color="#517fa4" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.categoryListContainer}>
                  <SearchBar
                    onChangeText={(value) =>
                      this.onChangeText('selected_category_name', value)
                    }
                    value={this.state.selected_category_name}
                    placeholder={translate('home.search_category')}
                    lightTheme
                    round
                  />
                  <FlatList
                    keyboardShouldPersistTaps={'handled'}
                    data={this.state.categories}
                    keyExtractor={(category) => category.id.toString()}
                    renderItem={({item}) => {
                      return (
                        <TouchableOpacity
                          style={{
                            backgroundColor:
                              this.state.selected_category_id == item.id
                                ? '#4598e6'
                                : '#fff',
                          }}
                          onPress={() => {
                            this.CategorySelected(item.name, item.id);
                          }}>
                          <View
                            style={{
                              borderBottomWidth: 0.5,
                              borderColor: 'rgb(150,150,150)',
                            }}>
                            <Text style={styles.categoriesListText}>
                              {item.name}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              </View>
            </View>
          </Modal>
          {
            //Categories Modal End
          }
          {
            //Gender Modal Start
          }

          <Modal
            visible={this.state.genders_visibility}
            transparent={true}
            animationType="slide">
            <TouchableOpacity
              style={styles.modalBack}
              onPress={() => this.setState({genders_visibility: false})}
            />
            <View style={styles.bottomModal}>
              <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                  <View style={styles.headerContainer}>
                    <Text style={styles.modalHeaderTitle}>
                      {translate('home.search_gender')}
                    </Text>
                    <TouchableOpacity
                      style={styles.ModalCloseButton}
                      onPress={() =>
                        this.setState({genders_visibility: false})
                      }>
                      <Icon name="close" color="#517fa4" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.categoryListContainerNoHeight}>
                  <FlatList
                    keyboardShouldPersistTaps={'handled'}
                    data={genders}
                    keyExtractor={(gender) => gender.id.toString()}
                    renderItem={({item}) => {
                      return (
                        <TouchableOpacity
                          style={{
                            backgroundColor:
                              this.state.gender == item.name
                                ? '#4598e6'
                                : '#fff',
                          }}
                          onPress={() => {
                            this.setState({
                              genders_visibility: false,
                            });
                            this.SelectGender(item.name);
                          }}>
                          <View style={styles.modalItem}>
                            <Text style={styles.categoriesListText}>
                              {item.name}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              </View>
            </View>
          </Modal>
          {
            //Gender Modal End
          }
          {this.GetActionSheet()}
          {<LoadingAnimationModal isModalVisible={this.state.result_loading} />}
        </ImageBackground>
      </View>
    );
  }
}

{
  /* <View
style={styles.mainContainer}>
<ImageBackground style={styles.imageBack} source={IMAGEBACK}>
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
</ImageBackground>
  </View> */
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
