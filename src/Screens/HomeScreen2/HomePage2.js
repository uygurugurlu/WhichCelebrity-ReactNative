import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
  ImageBackground,
  Modal,
} from 'react-native';
import { connect } from 'react-redux';
import { Button, Icon } from 'react-native-elements';
import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from '@react-native-firebase/admob';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import { CropView } from 'react-native-image-crop-tools';
import ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import { translate } from '../../I18n';
import { styles } from './HomePage2Styles';
import {
  get_detected_face_count,
  get_user_avatar_source,
} from '../../Store/Actions';
import AvatarComponent from '../../common/Components/AvatarComponent';
import SelectCelebrityComponent from '../../common/Components/SelectCelebrityComponent';
import {
  WAIT_BEFORE_AD_MILLISECONDS,
  WAIT_LOADING_ANIMATION_MILLISECONDS,
  IMAGEBACK,
} from '../../common/Constants';
import { UserPhotoAnalyze2 } from '../../common/Functions/Endpoints/UserPhotoAnalyze2';
import { ShowSnackBar } from '../../common/Components/ShowSnackBar';
import { DetectFace } from '../../common/Functions/DetectFace';
import LoadingAnimationModal from '../../common/Components/LoadingAnimationModal/LoadingAnimationModal';
import { PerformTimeConsumingTask } from '../../common/Functions/PerformTimeConsumingTask';
import {
  SetCelebritySelectionScreenEvent,
  RandomResultEvent,
  SelectedCelebrityResultEvent,
} from '../../common/Functions/AnalyticEvents/Events';

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

class HomePage2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
      loaded: false,
      result_loading: false,
      random_result_loading: false,
      celebrity_id: 0,
      search_visible: true,
      tooltipVisible: false,
      detected_faces: false,
      celebrities_visibility: false,
      optionsModalVisible: false,
      imageUri: '',
      crop_visibility: false,
    };
    this.cropViewRef = React.createRef();
  }

  componentWillMount() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('SavingsPage')}
        >
          <Icon
            name="photo-library"
            color="white"
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
  };

  updateSearch = (search) => this.setState({ search, profile_visible: search === '' });

  WhenTheLanguageChanged = () => this.forceUpdate();

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
    console.log('faces:', faces, faces.length);
  };

  SelectAvatar = () => this.setState({ optionsModalVisible: true });

  CheckValidity = (random) => {
    const { userAvatarSource, detected_face_count } = this.props;
    const { celebrity_id } = this.state;

    if (userAvatarSource === '') {
      Alert.alert('', translate('home.avatar_warning'));
      return false;
    } if (celebrity_id === 0 && !random) {
      Alert.alert('', translate('home.select_warning'));
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
      crashlytics().recordError(e);
      console.log('Error ShowAD: ', e);
    }
  };

  NavigateToResultPage2 = (data) => {
    const { celebrity_name } = this.state;
    this.props.navigation.navigate('ResultPage2', {
      celebrity_photo: data.celebrity.photo,
      celebrity_name,
      data,
    });
  };

  GetResult = async () => {
    const { userAvatarB64, user_agent, language } = this.props;
    console.log("auth token in result: ",this.props.auth_token);
    const { celebrity_id } = this.state;
    this.LoadAD();
    await SelectedCelebrityResultEvent();

    if (this.CheckValidity(false)) {
      this.setState({ result_loading: true });

      try {
        const { data } = await UserPhotoAnalyze2(
          user_agent,
          userAvatarB64,
          celebrity_id,
          language.languageTag,
          'false',
          this.props.auth_token,
        );
        console.log('UserPhotoAnalyze res: ', JSON.parse(data).data[0]);

        const wait = await PerformTimeConsumingTask(
          WAIT_LOADING_ANIMATION_MILLISECONDS,
        );
        if (wait !== null) {
          this.setState({ result_loading: false });
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

      this.setState({ result_loading: false });
    }
  };

  GetRandomResult = async () => {
    const { userAvatarB64, user_agent, language, auth_token } = this.props;
    this.LoadAD();
    await RandomResultEvent();

    analytics().logEvent('randomevent', {
      item: 'Clicked',
    });

    if (this.CheckValidity(true)) {
      await this.setState({ random_result_loading: true });

      try {
        const { data } = await UserPhotoAnalyze2(
          user_agent,
          userAvatarB64,
          null,
          language.languageTag,
          'true',
          auth_token,

        );
        console.log('UserPhotoAnalyze res: ', (data));

        const wait = await PerformTimeConsumingTask(
          WAIT_LOADING_ANIMATION_MILLISECONDS,
        );
        if (wait !== null) {
          this.setState({ random_result_loading: false });
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

      this.setState({ random_result_loading: false });
    }
  };

  setCelebrityId = (id) => {
    this.setState({ celebrity_id: id });
  }

  render() {
    const { userAvatarSource } = this.props;
    const {
      celebrity_id,
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
            <SelectCelebrityComponent setCelebrityId={this.setCelebrityId} />

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
              titleStyle={{ fontSize: 17, fontWeight: '600' }}
              onPress={() => this.GetRandomResult()}
              disabled={celebrity_id !== 0}
              loading={random_result_loading}
            />

            <Button
              title={translate('home.get_result')}
              buttonStyle={styles.resultButtonStyle}
              titleStyle={{ fontSize: 17, fontWeight: '600' }}
              onPress={() => this.GetResult()}
              loading={result_loading}
            />
          </View>

          <LoadingAnimationModal
            text={translate('home.loading_text_2')}
            isModalVisible={result_loading || random_result_loading}
          />

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
                  <Text style={styles.settingsButton}>Kamerayı aç</Text>
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
                  <Text style={styles.settingsButton}>Galeriden seç</Text>
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
                <Text style={styles.cancelButton}>İptal Et</Text>
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
                    onPress={() => this.setState({ crop_visibility: false })}
                  >
                    <Icon color="white" name="close" />
                  </TouchableOpacity>
                </View>
                <View style={styles.cropButtonContainer}>
                  <TouchableOpacity
                    style={styles.cropWrapper}
                    onPress={() => this.cropViewRef.current.saveImage(true, 30)}
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
  auth_token: state.mainReducer.auth_token
});

const mapDispatchToProps = (dispatch) => ({
  get_user_avatar_source: (source, base64_data) => dispatch(get_user_avatar_source(source, base64_data)),
  get_detected_face_count: (count) => dispatch(get_detected_face_count(count)),
});
export default connect(mapStateToProps, mapDispatchToProps)(HomePage2);
