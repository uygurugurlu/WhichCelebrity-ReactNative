import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
  Platform,
  ImageBackground,
  TouchableHighlight,
  Modal,
  FlatList,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import {translate} from '../../I18n';
import {Button, Icon, SearchBar} from 'react-native-elements';
import {styles} from './HomePage2Styles';
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
import SearchBarComponent from '../../common/Components/SearchBarComponent';
import SelectCelebrityComponent from '../../common/Components/SelectCelebrityComponent';

import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  shadow,
  WAIT_BEFORE_AD_MILLISECONDS,
  WAIT_LOADING_ANIMATION_MILLISECONDS,
  IMAGEBACK,
} from '../../common/Constants';
import {SearchCelebrities} from '../../common/Functions/Endpoints/SearchCelebrities';
import {GetCelebrity} from '../../common/Functions/Endpoints/GetCelebrity';
import {GetCelebrities} from '../../common/Functions/Endpoints/GetCelebrities';
import SelectedCelebrityLine from '../../common/Components/SelectedCelebrityLine';
import {UserPhotoAnalyze2} from '../../common/Functions/Endpoints/UserPhotoAnalyze2';
import CacheImageComponent from '../../common/Components/CacheImagecomponent';
import TooltipComponent from '../../common/Components/TooltipComponent';
import {ShowSnackBar} from '../../common/Components/ShowSnackBar';
import {DetectFace} from '../../common/Functions/DetectFace';
import LoadingAnimationModal from '../../common/Components/LoadingAnimationModal/LoadingAnimationModal';
import {PerformTimeConsumingTask} from '../../common/Functions/PerformTimeConsumingTask';
import {blue_text_color} from '../../common/ColorIndex.js';
import {
  SetCelebritySelectionScreenEvent,
  RandomResultEvent,
  SelectedCelebrityResultEvent,
} from '../../common/Functions/AnalyticEvents/Events';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import {CropView} from 'react-native-image-crop-tools';
import ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';
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
      celebrity_name: '',
      celebrity_photo: '',
      celebrity_id: 0,
      search_visible: true,
      tooltipVisible: false,
      detected_faces: false,
      celebrities_visibility: false,
      optionsModalVisible: false,
      imageUri: '',
      crop_visibility: false,
      isCelebritySelected: false,
    };
    this.cropViewRef = React.createRef();
  }

  componentWillMount() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('SavingsPage')}>
          <Icon
            name={'photo-library'}
            color={'white'}
            style={{
              height: 35,
              width: 35,
              marginRight: 15,
              alignSelf: 'center',
            }}
          />
        </TouchableOpacity>
      ),
    });
  }

  componentDidMount = () => {
    SetCelebritySelectionScreenEvent();
    interstitial.load();
    this.getInitialCelebrities();
  };

  updateSearch = (search) =>
    this.setState({search: search, profile_visible: search === ''});

  showActionSheet = () => this.actionSheet.show();

  getActionSheetRef = (ref) => (this.actionSheet = ref);

  handlePress = (index) => this.setState({selected: index});

  WhenTheLanguageChanged = () => this.forceUpdate();

  LaunchCamera = async () => {
    /* const {path, data} = await GetUserPhotoFromCamera();
    this.props.get_user_avatar_source({uri: path}, data);
    const faces = await DetectFace(path);
    this.props.get_detected_face_count(faces.length);
    console.log('faces:', faces, faces.length); */
    await this.setState({optionsModalVisible: false});
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
  };
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
    var data = await RNFS.readFile(res.uri, 'base64');
    this.props.get_user_avatar_source({uri: res.uri}, data);
    const faces = await DetectFace(res.uri);
    this.setState({crop_visibility: false});
    this.props.get_detected_face_count(faces.length);
    console.log('faces:', faces, faces.length);
  };

  SelectAvatar = () => this.setState({optionsModalVisible: true});

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
      crashlytics().recordError(e);
      console.log('Error ShowAD: ', e);
    }
  };

  NavigateToResultPage2 = (data) => {
    const {celebrity_name} = this.state;
    this.props.navigation.navigate('ResultPage2', {
      celebrity_photo: data.celebrity.photo,
      celebrity_name: celebrity_name,
      data: data,
    });
  };

  GetResult = async () => {
    const {userAvatarB64, user_agent, language} = this.props;
    const {celebrity_id} = this.state;
    this.LoadAD();
    await SelectedCelebrityResultEvent();

    if (this.CheckValidity(false)) {
      this.setState({result_loading: true});

      try {
        const {data} = await UserPhotoAnalyze2(
          user_agent,
          userAvatarB64,
          celebrity_id,
          language.languageTag,
          'false',
        );
        console.log('UserPhotoAnalyze res: ', JSON.parse(data).data[0]);

        const wait = await PerformTimeConsumingTask(
          WAIT_LOADING_ANIMATION_MILLISECONDS,
        );
        if (wait !== null) {
          this.setState({result_loading: false});
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
          await this.setState({isCelebritySelected: false});
          this.NavigateToResultPage2(JSON.parse(data).data[0]);
          this.HideProfile();
        }
      } catch (e) {
        console.log('Error UserPhotoAnalyze2: ', e);
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

  GetRandomResult = async () => {
    const {userAvatarB64, user_agent, language} = this.props;
    this.LoadAD();
    await RandomResultEvent();

    analytics().logEvent('randomevent', {
      item: 'Clicked',
    });

    if (this.CheckValidity(true)) {
      await this.setState({random_result_loading: true});

      try {
        const {data} = await UserPhotoAnalyze2(
          user_agent,
          userAvatarB64,
          null,
          language.languageTag,
          'true',
        );
        console.log('UserPhotoAnalyze res: ', JSON.parse(data).data[0]);

        const wait = await PerformTimeConsumingTask(
          WAIT_LOADING_ANIMATION_MILLISECONDS,
        );
        if (wait !== null) {
          this.setState({random_result_loading: false});
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

          this.NavigateToResultPage2(JSON.parse(data).data[0]);
          this.HideProfile();
        }
      } catch (e) {
        console.log('Error UserPhotoAnalyze2: ', e);
        crashlytics().recordError(e);
        ShowSnackBar(
          translate('home.result_not_found'),
          'SHORT',
          'TOP',
          'ERROR',
        );
      }

      this.setState({random_result_loading: false});
    }
  };

  getInitialCelebrities = (async) => {
    GetCelebrities(this.props.user_agent).then((res) => {
      console.log('Initial Celebrities : ', res.data);
      this.setState({scroll_items: res.data});
    });
  };
  fillScroll = async (search) => {
    if (search.length > 1) {
      SearchCelebrities(this.props.user_agent, search).then((res) => {
        console.log('Celebrities after search: ', res.data);

        /* const items = res.data.map((item) => {
          return (
            <TouchableOpacity
              style={styles.scrollItemContainer}
              onPress={() => this.CelebritySelected(item)}>
              <View style={[{marginHorizontal: DEVICE_WIDTH * 0.051}, shadow]}>
                <CacheImageComponent uri={item.photo} reduce_ratio={10} />
              </View>
              <Text style={styles.scrollTextStyle}>{item.name}</Text>
            </TouchableOpacity>
          );
        });
        */

        this.setState({scroll_items: res.data});
      });
    } else {
      this.getInitialCelebrities();
    }
  };

  CelebritySelected = (celebrity) => {
    const {user_agent} = this.props;
    this.setState({
      search: celebrity.name,
      celebrity_name: celebrity.name,
      celebrity_id: celebrity.id,
      celebrity_photo: celebrity.photo,
      search_visible: false,
    });

    GetCelebrity(user_agent, celebrity.id).then((res) => {
      console.log('GetCelebrity res: ', res);
      this.setState({celebrity_photo: res.data.photo});
    });
  };

  HideProfile = () => {
    this.setState({search_visible: true, celebrity_name: ''});
  };
  cancelCelebrity = () => {
    this.setState({
      isCelebritySelected: false,
      celebrity_name: '',
      celebrity_id: '',
      celebrity_photo: '',
      search: '',
    });
    this.getInitialCelebrities();
  };
  render() {
    var x, y, width, height;
    const {userAvatarSource} = this.props;
    const {
      search,
      scroll_items,
      celebrity_name,
      celebrity_photo,
      search_visible,
      tooltipVisible,
      random_result_loading,
      result_loading,
    } = this.state;
    return (
      <View style={styles.mainContainer}>
        <ImageBackground style={styles.imageBack} source={IMAGEBACK}>
          <View style={styles.topLabelContainerStyle}>
            <Text style={styles.topLabelStyle}>
              {translate('famous_compare.compare_header')}
            </Text>

            {!this.state.isCelebritySelected ? (
              <TouchableHighlight
                style={styles.selectCategoryContainer}
                onPress={() => this.setState({celebrities_visibility: true})}>
                <View style={styles.selectCategoryWrapper}>
                  <Text style={styles.selectCategoryText}>
                    {this.state.celebrity_name == ''
                      ? translate('home.select_celebrity')
                      : this.state.celebrity_name}
                  </Text>
                  <Icon
                    name="keyboard-arrow-right"
                    color="#284077"
                    style={styles.selectCategoryIcon}
                  />
                </View>
              </TouchableHighlight>
            ) : (
              <View style={styles.celebritySelectedContainer}>
                <TouchableHighlight
                  style={styles.celebritySelectedPressContainer}
                  onPress={() => this.setState({celebrities_visibility: true})}>
                  <View style={styles.celebritySelectedPress}>
                    <Text style={styles.selectCategoryText}>
                      {this.state.celebrity_name == ''
                        ? translate('home.select_celebrity')
                        : translate('home.select_another_celebrity')}
                    </Text>
                    <Icon
                      name="keyboard-arrow-down"
                      color="#284077"
                      style={styles.selectCategoryIcon}
                    />
                  </View>
                </TouchableHighlight>
                <View style={styles.celebritySelectedRow}>
                  <View
                    style={styles.celebritySelectedImageContainer}
                    onLayout={(e) => {
                      width = e.nativeEvent.layout.width;
                      height = e.nativeEvent.layout.height;
                    }}>
                    <View style={styles.celebritySelectedImageWrapper}>
                      <Image
                        source={{uri: this.state.celebrity_photo}}
                        style={[
                          styles.celebritySelectedImage,
                          {width: width, height: height},
                        ]}
                      />
                    </View>
                  </View>
                  <View style={styles.celebritySelectedName}>
                    <Text style={styles.celebritySelectedNameText}>
                      {this.state.celebrity_name}
                    </Text>
                  </View>
                  <View style={styles.selectedCelebrityCancel}>
                    <TouchableOpacity onPress={() => this.cancelCelebrity()}>
                      <Icon name={'cancel'} color={blue_text_color} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </View>

          <View style={styles.cameraContainer}>
            <AvatarComponent
              ImageSource={userAvatarSource}
              SelectAvatar={() => this.SelectAvatar()}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title={translate('home.random_compare')}
              buttonStyle={styles.randomButtonStyle}
              titleStyle={{fontSize: 17, fontWeight: '600'}}
              onPress={() => this.GetRandomResult()}
              disabled={celebrity_name !== ''}
              loading={random_result_loading}
            />

            <Button
              title={translate('home.get_result')}
              buttonStyle={styles.resultButtonStyle}
              titleStyle={{fontSize: 17, fontWeight: '600'}}
              onPress={() => this.GetResult()}
              loading={result_loading}
            />
          </View>

          <LoadingAnimationModal
            text={translate('home.loading_text_2')}
            isModalVisible={result_loading || random_result_loading}
          />
          {
            //Celebrities Modal
          }
          <Modal
            visible={this.state.celebrities_visibility}
            transparent={true}
            animationType="slide">
            <TouchableOpacity
              style={styles.modalBack}
              onPress={() => this.setState({celebrities_visibility: false})}
            />
            <View style={styles.bottomModal}>
              <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                  <View style={styles.headerContainer}>
                    <Text style={styles.modalHeaderTitle}>
                      {translate('home.select_celebrity')}
                    </Text>
                    <TouchableOpacity
                      style={styles.ModalCloseButton}
                      onPress={() =>
                        this.setState({celebrities_visibility: false})
                      }>
                      <Icon name="close" color="#517fa4" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.categoryListContainer}>
                  <SearchBar
                    onChangeText={(e) => this.updateSearch(e)}
                    value={this.state.search}
                    placeholder={translate('home.search_celebrity')}
                    lightTheme
                    round
                  />
                  <FlatList
                    style={{marginTop: 7}}
                    keyboardShouldPersistTaps={'handled'}
                    data={this.state.scroll_items}
                    keyExtractor={(celeb) => celeb.id.toString()}
                    renderItem={({item}) => {
                      return (
                        <TouchableOpacity
                          style={{
                            backgroundColor:
                              this.state.celebrity_id == item.id
                                ? '#4598e6'
                                : '#fff',
                          }}
                          onPress={() => {
                            this.CelebritySelected(item);
                            this.setState({
                              celebrities_visibility: false,
                              isCelebritySelected: true,
                            });
                          }}>
                          <View
                            style={{
                              borderBottomWidth: 0.5,
                              borderColor: 'rgb(150,150,150)',
                              paddingBottom: 7,
                              marginBottom: 7,
                            }}>
                            <View style={styles.modalItemContainer}>
                              <View style={styles.modalImageContainer}>
                                <Image
                                  source={{uri: item.photo}}
                                  style={styles.modalImage}
                                />
                              </View>
                              <Text style={styles.categoriesListText}>
                                {item.name}
                              </Text>
                            </View>
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
                  onPress={() => this.LaunchCamera()}
                  style={styles.settingsMainButtons}>
                  <Text style={styles.settingsButton}>Kamerayı aç</Text>
                  <Icon
                    name="camera-alt"
                    color="#1a84f4"
                    style={{margin: 4, alignSelf: 'center'}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.LaunchImageLibrary()}
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
                    <Icon color={'white'} name={'close'} />
                  </TouchableOpacity>
                </View>
                <View style={styles.cropButtonContainer}>
                  <TouchableOpacity
                    style={styles.cropWrapper}
                    onPress={() =>
                      this.cropViewRef.current.saveImage(true, 30)
                    }>
                    <Icon color={'white'} name={'check'} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          {
            //Crop Modal End
          }
        </ImageBackground>
      </View>

      /*<View style={styles.backgroundImageStyle}>
        <SafeAreaView style={styles.mainContainer}>
          <View style={styles.labelsContainerStyle}>
            <View
              display={search === '' && search_visible ? 'flex' : 'none'}
              style={styles.topLabel2ContainerStyle}>
              <Text style={styles.topLabel2Style}>
                {translate('famous_compare.compare_header')}
              </Text>
              <TooltipComponent isVisible={tooltipVisible} />
            </View>

            <View display={search_visible ? 'flex' : 'none'}>
              <SearchBarComponent
                search={search}
                updateSearch={this.updateSearch}
                selectedCelebrity={celebrity_name}
              />
            </View>

            <View display={search !== '' ? 'flex' : 'none'}>
              <ScrollView
                style={{maxHeight: DEVICE_HEIGHT * 0.75, color: '#fff'}}>
                <View style={styles.scrollViewStyle}>{scroll_items}</View>
              </ScrollView>
            </View>

            <View
              display={!search_visible ? 'flex' : 'none'}
              style={{marginTop: DEVICE_HEIGHT * 0.075}}>
              <SelectedCelebrityLine
                uri={celebrity_photo}
                name={celebrity_name}
                handleSelect={() => this.HideProfile()}
              />
            </View>
          </View>

          <View
            display={search === '' ? 'flex' : 'none'}
            style={styles.iconsMainContainerStyle}>
            <AvatarComponent
              ImageSource={userAvatarSource}
              SelectAvatar={() => this.SelectAvatar()}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: DEVICE_WIDTH * 0.9,
            }}
            display={search === '' ? 'flex' : 'none'}>
            <Button
              title={translate('home.random_compare')}
              buttonStyle={styles.randomButtonStyle}
              titleStyle={{fontSize: 17, fontWeight: '600'}}
              onPress={() => this.GetRandomResult()}
              disabled={celebrity_name !== ''}
              loading={random_result_loading}
            />

            <Button
              title={translate('home.get_result')}
              buttonStyle={styles.resultButtonStyle}
              titleStyle={{fontSize: 17, fontWeight: '600'}}
              onPress={() => this.GetResult()}
              loading={result_loading}
            />
          </View>

          {this.GetActionSheet()}
          <LoadingAnimationModal
            isModalVisible={result_loading || random_result_loading}
          />
        </SafeAreaView>
      </View> */
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
export default connect(mapStateToProps, mapDispatchToProps)(HomePage2);
