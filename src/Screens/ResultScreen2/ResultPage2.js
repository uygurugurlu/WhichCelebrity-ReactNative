import React, {Component} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  Animated,
  ImageBackground,
  Modal,
  Text,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {styles} from './ResultPage2Styles';
import {connect} from 'react-redux';
import {translate} from '../../I18n';
import {
  get_captured_image_uri,
  get_user_avatar_source,
  trigger_savings_page,
} from '../../Store/Actions';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import SharedImageBottomComponent from '../../common/Components/SharedImageBottomComponent';
import {RIGHT_HEADER_ICON} from '../../common/IconIndex';
import * as Animatable from 'react-native-animatable';
import ResultButtonsRow from '../../common/Components/ResultButtonsRow';
import ActionSheetComponent2 from '../../common/Components/ActionSheetComponent2';
import {SavePicture} from '../../common/Functions/SavePicture';
import ResultPageBody from '../ResultScreen/ResultPageBody/ResultPageBody';
import Swiper from 'react-native-swiper';
import {PerformTimeConsumingTask} from '../../common/Functions/PerformTimeConsumingTask';
import {DEVICE_HEIGHT, IMAGEBACK} from '../../common/Constants';
import {
  ShareResultEvent,
  ShareAppEvent,
} from '../../common/Functions/AnalyticEvents/Events';
import crashlytics from '@react-native-firebase/crashlytics';

const ANIMATION_DURATION = 1000;

class ResultPage2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready_to_share: false,
      share_active: false,
      progress: new Animated.Value(0),
      data: this.props.route.params.data,
      isVisible: false,
      swiper_index: 0,
      captured_image: '',
      optionsModalVisible: false,
    };
  }

  componentWillMount = async () => {
    this.props.navigation.setOptions({
      title: translate('app_name'),
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('SavingsPage', {tab_index: 0})
          }>
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
  };

  takeScreenShot = async (index) => {
    const data = await PerformTimeConsumingTask(50);
    await this.setState({share_active: true});
    if (data !== null) {
      await this.GetScreenShot(index);
    }
  };

  Save = async (uri) => {
    if (Platform.OS === 'android') {
      await this.HasAndroidPermission().then((res) => {
        return !res;
      });
    }

    await SavePicture(
      uri,
      this.HasAndroidPermission,
      this.props.trigger_savings_page,
    );
  };

  ShareApp = async () => {
    const shareOptions = {
      title: translate('app_name'),
      message: 'https://looklikecelebrity.page.link/naxz',
      failOnCancel: false,
    };

    await Share.open(shareOptions)
      .then(async (res) => {
        console.log('share response: ', res);
        await this.setState({share_active: false});
        this.ref2.zoomInUp(ANIMATION_DURATION);
        ShareAppEvent();
      })
      .catch((err) => {
        crashlytics().recordError(err);
        err && console.log(err);
        this.setState({share_active: false});
        this.ref2.zoomInUp(ANIMATION_DURATION);
      });
  };

  ShareResult = async (captured_uri) => {
    /** This functions share an image passed using the url param */
    const shareOptions =
      Platform.OS === 'ios'
        ? {
            title: translate('app_name'),
            url: captured_uri,
            subject: translate('app_name'), // for email,
            failOnCancel: false,
          }
        : {
            title: translate('app_name'),
            url: captured_uri,
            message: 'https://looklikecelebrity.page.link/naxz',
            subject: translate('app_name'), // for email,
            failOnCancel: false,
          };

    await Share.open(shareOptions)
      .then(async (res) => {
        console.log('share response: ', res);
        await this.setState({share_active: false});
        this.ref2.zoomInUp(ANIMATION_DURATION);
        ShareResultEvent();
      })
      .catch((err) => {
        err && console.log(err);
        crashlytics().recordError(err);
        this.setState({share_active: false});
        this.ref2.zoomInUp(ANIMATION_DURATION);
      });
  };

  ActionHandler = async (index) => {
    try {
      if (index === 2) {
        await this.ShareApp();
      } else {
        await this.takeScreenShot(index);
      }
    } catch (e) {
      console.log('Error takeScreenShot: ', e);
      crashlytics().recordError(e);
    }
  };

  HasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  };

  GetScreenShot = async (index) => {
    const data = await PerformTimeConsumingTask(250);

    if (data !== null) {
      this.viewShot
        .capture()
        .then(async (uri) => {
          this.setState({share_active: false});
          this.ref2.zoomInUp(ANIMATION_DURATION);
          await this.setState({captured_image: uri});
          await this.ref4.flash(1000);
          this.props.get_captured_image_uri(uri);
          if (index === 0) {
            await this.Save(uri);
          } else {
            await this.ShareResult(uri);
          }
        })
        .catch((e) => {
          crashlytics().recordError(e);
          this.setState({share_active: false});
        });
    }
  };

  shouldComponentUpdate = async (nextProps, nextState) => {
    if (nextProps.language.languageTag !== this.props.language.languageTag) {
      await this.WhenTheLanguageChanged();
    }
  };

  WhenTheLanguageChanged = () => this.forceUpdate();

  showActionSheet = () => this.setState({optionsModalVisible: true});

  getActionSheetRef = (ref) => (this.actionSheet = ref);

  GoBack = async () => await this.props.navigation.pop();

  GetActionSheet = () => {
    return (
      <ActionSheetComponent2
        launchImageLibrary={this.LaunchImageLibrary}
        launchCamera={this.LaunchCamera}
        handlePress={this.handlePress}
        Share={(index) => this.ActionHandler(index)}
        getActionSheetRef={this.getActionSheetRef}
      />
    );
  };

  render() {
    const {userAvatarSource} = this.props;
    const {share_active, data} = this.state;

    return (
      <View style={styles.container}>
        <ImageBackground style={styles.imageBack} source={IMAGEBACK}>
          <Animatable.View
            ref={(ref) => (this.ref4 = ref)}
            style={styles.scrollViewStyle}>
            <ViewShot
              ref={(ref) => (this.viewShot = ref)}
              options={{format: 'jpg', quality: 0.9}}
              style={styles.viewShotImageStyle}>
              <View style={styles.swiperContainer}>
                <ResultPageBody
                  userAvatarSource={userAvatarSource}
                  titleIndex={0}
                  data={data}
                />
              </View>
              <View style={styles.bottomContainer}>
                <Animatable.View
                  ref={(ref) => (this.ref2 = ref)}
                  easing={'linear'}>
                  <ResultButtonsRow
                    share_active={share_active}
                    optionsModalVisible={this.showActionSheet}
                    goBack={this.GoBack}
                  />
                </Animatable.View>

                <Animatable.View
                  ref={(ref) => (this.ref1 = ref)}
                  easing={'linear'}>
                  <SharedImageBottomComponent shareActive={share_active} />
                </Animatable.View>
              </View>
            </ViewShot>
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
                        this.ActionHandler(0),
                      )
                    }
                    style={styles.settingsMainButtons}>
                    <Text style={styles.settingsButton}>
                      {translate('image_picker.save_result')}
                    </Text>
                    <Icon
                      name="save"
                      color="#1a84f4"
                      style={{margin: 4, alignSelf: 'center'}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({optionsModalVisible: false}, () =>
                        this.ActionHandler(1),
                      )
                    }
                    style={styles.settingsMainButtons}>
                    <Text style={styles.settingsButton}>
                      {translate('image_picker.share_result')}
                    </Text>
                    <Icon
                      name="share"
                      color="#1a84f4"
                      style={{margin: 4, alignSelf: 'center'}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({optionsModalVisible: false}, () =>
                        this.ActionHandler(2),
                      )
                    }
                    style={styles.settingsMainButtons}>
                    <Text style={styles.settingsButton}>
                      {translate('image_picker.share_app')}
                    </Text>
                    <Icon
                      name="mobile-screen-share"
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
          </Animatable.View>
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.mainReducer.language,
    userAvatarSource: state.mainReducer.userAvatarSource,
    userAvatarSourceB64: state.mainReducer.userAvatarSourceB64,
    captured_image_uri: state.mainReducer.captured_image_uri,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get_user_avatar_source: (source, base64_data) =>
      dispatch(get_user_avatar_source(source, base64_data)),
    get_captured_image_uri: (image_uri) =>
      dispatch(get_captured_image_uri(image_uri)),
    trigger_savings_page: () => dispatch(trigger_savings_page()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultPage2);

/*
import React, {Component} from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  Platform,
  Easing,
  PermissionsAndroid,
  Animated,
} from 'react-native';
import {styles} from './ResultPage2Styles';
import {connect} from 'react-redux';
import {translate} from '../../I18n';
import {
  get_captured_image_uri,
  trigger_savings_page,
} from '../../Store/Actions';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import SharedImageBottomComponent from '../../common/Components/SharedImageBottomComponent';
import {RIGHT_HEADER_ICON} from '../../common/IconIndex';
import * as Animatable from 'react-native-animatable';
import ResultButtonsRow from '../../common/Components/ResultButtonsRow';
import ActionSheetComponent2 from '../../common/Components/ActionSheetComponent2';
import {SavePicture} from '../../common/Functions/SavePicture';
import ResultPageBody from '../ResultScreen/ResultPageBody/ResultPageBody';
import {PerformTimeConsumingTask} from '../../common/Functions/PerformTimeConsumingTask';
import {
  ShareAppEvent,
  ShareResultEvent,
} from '../../common/Functions/AnalyticEvents/Events';
import crashlytics from "@react-native-firebase/crashlytics";

const ANIMATION_DURATION = 1000;

class ResultPage2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready_to_share: false,
      share_active: false,
      progress: new Animated.Value(0),
      celebrity_name: '',
      data: this.props.route.params.data,
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

  componentDidMount = async () => {
    const {celebrity_name} = this.props.route.params;
    this.setState({celebrity_name: celebrity_name});
  };

  takeScreenShot = async (index) => {
    await this.actionSheet.hide();
    const data = await PerformTimeConsumingTask(50);
    await this.setState({share_active: true});
    if (data !== null) {
      await this.GetScreenShot(index);
    }
  };

  GoBack = async () => await this.props.navigation.pop();

  WhenTheLanguageChanged = () => this.forceUpdate();

  showActionSheet = () => this.actionSheet.show();

  getActionSheetRef = (ref) => (this.actionSheet = ref);

  Save = async (uri) => {
    if (Platform.OS === 'android') {
      await this.HasAndroidPermission().then((res) => {
        return !res;
      });
    }

    await SavePicture(
      uri,
      this.HasAndroidPermission,
      this.props.trigger_savings_page,
      this.actionSheet.hide,
    );
  };

  ShareApp = async () => {
    const shareOptions = {
      title: translate('app_name'),
      message: 'https://looklikecelebrity.page.link/naxz',
      failOnCancel: false,
    };

    await Share.open(shareOptions)
      .then(async (res) => {
        console.log('share response: ', res);
        await this.setState({share_active: false});
        this.ref2.zoomInUp(ANIMATION_DURATION);
        await this.actionSheet.hide();
        ShareAppEvent();
      })
      .catch((err) => {
        err && console.log(err);
        crashlytics().recordError(err);
        this.setState({share_active: false});
        this.ref2.zoomInUp(ANIMATION_DURATION);
        this.actionSheet.hide();
      });
  };

  ShareResult = async (captured_uri) => {
    const shareOptions =
      Platform.OS === 'ios'
        ? {
            title: translate('app_name'),
            url: captured_uri,
            subject: translate('app_name'), // for email,
            failOnCancel: false,
          }
        : {
            title: translate('app_name'),
            url: captured_uri,
            message: 'https://looklikecelebrity.page.link/naxz',
            subject: translate('app_name'), // for email,
            failOnCancel: false,
          };

    await Share.open(shareOptions)
      .then(async (res) => {
        console.log('share response: ', res);
        await this.setState({share_active: false});
        this.ref2.zoomInUp(ANIMATION_DURATION);
        await this.actionSheet.hide();
        ShareResultEvent();
      })
      .catch((err) => {
        err && console.log(err);
        this.setState({share_active: false});
        this.ref2.zoomInUp(ANIMATION_DURATION);
        this.actionSheet.hide();
      });
  };

  ActionHandler = async (index) => {
    try {
      if (index === 2) {
        await this.ShareApp();
      } else {
        await this.takeScreenShot(index);
      }
    } catch (e) {
      console.log('Error takeScreenShot: ', e);
      crashlytics().recordError(e);
    }
  };

  Share = async (index) => {
    const shareOptions1 =
      Platform.OS === 'ios'
        ? {
            title: translate('app_name'),
            url: this.props.captured_image_uri,
            subject: translate('app_name'), // for email,
            failOnCancel: false,
          }
        : {
            title: translate('app_name'),
            url: this.props.captured_image_uri,
            message: 'https://looklikecelebrity.page.link/naxz',
            subject: translate('app_name'), // for email,
            failOnCancel: false,
          };

    const shareOptions2 = {
      title: translate('app_name'),
      message: 'https://looklikecelebrity.page.link/naxz',
      failOnCancel: false,
    };

    if (index === 0) {
      if (Platform.OS === 'android') {
        await this.HasAndroidPermission().then((res) => {
          return !res;
        });
      }
      await SavePicture(
        this.props.captured_image_uri,
        () => this.HasAndroidPermission(),
        () => this.props.trigger_savings_page(),
        () => this.actionSheet.hide(),
      );
    } else {
      await Share.open(index === 1 ? shareOptions1 : shareOptions2)
        .then(async (res) => {
          console.log('share response: ', res);
          await this.setState({share_active: false});
          this.ref2.zoomInUp(ANIMATION_DURATION);
          await this.actionSheet.hide();
        })
        .catch((err) => {
          err && console.log(err);
          crashlytics().recordError(err);
          this.setState({share_active: false});
          this.ref2.zoomInUp(ANIMATION_DURATION);
          this.actionSheet.hide();
        });
    }
  };

  HasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  };

  GetScreenShot = async (index) => {
    const data = await PerformTimeConsumingTask(250);

    if (data !== null) {
      this.viewShot
        .capture()
        .then(async (uri) => {
          this.setState({share_active: false});
          this.ref2.zoomInUp(ANIMATION_DURATION);
          await this.setState({captured_image: uri});
          await this.ref4.flash(1000);
          this.props.get_captured_image_uri(uri);
          if (index === 0) {
            await this.Save(uri);
          } else {
            await this.ShareResult(uri);
          }
        })
        .catch((e) => {
          crashlytics().recordError(e);
          this.setState({share_active: false});
        });
    }
  };

  shouldComponentUpdate = async (nextProps, nextState) => {
    if (nextProps.language.languageTag !== this.props.language.languageTag) {
      await this.WhenTheLanguageChanged();
    }
  };

  GetActionSheet = () => {
    return (
      <ActionSheetComponent2
        launchImageLibrary={this.LaunchImageLibrary}
        launchCamera={this.LaunchCamera}
        handlePress={this.handlePress}
        Share={(index) => this.ActionHandler(index)}
        getActionSheetRef={this.getActionSheetRef}
      />
    );
  };

  render() {
    const {userAvatarSource} = this.props;
    const {data, share_active} = this.state;

    return (
      <Animatable.View
        ref={(ref) => (this.ref4 = ref)}
        style={styles.scrollViewStyle}>
        <ViewShot
          ref={(ref) => (this.viewShot = ref)}
          options={{format: 'jpg', quality: 0.9}}
          style={styles.viewShotImageStyle}>
          <ResultPageBody
            userAvatarSource={userAvatarSource}
            titleIndex={0}
            data={data}
          />

          <Animatable.View ref={(ref) => (this.ref2 = ref)} easing={'linear'}>
            <ResultButtonsRow
              share_active={share_active}
              showActionSheet={this.showActionSheet}
              goBack={this.GoBack}
            />
          </Animatable.View>

          <Animatable.View>
            <SharedImageBottomComponent shareActive={share_active} />
          </Animatable.View>
        </ViewShot>

        {this.GetActionSheet()}
      </Animatable.View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.mainReducer.language,
    userAvatarSource: state.mainReducer.userAvatarSource,
    userAvatarSourceB64: state.mainReducer.userAvatarSourceB64,
    captured_image_uri: state.mainReducer.captured_image_uri,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get_captured_image_uri: (image_uri) =>
      dispatch(get_captured_image_uri(image_uri)),
    trigger_savings_page: () => dispatch(trigger_savings_page()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultPage2);

*/
