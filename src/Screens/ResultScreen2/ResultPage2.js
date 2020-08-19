import React, {Component} from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Easing,
  PermissionsAndroid,
  Alert,
  SafeAreaView,
  Animated,
} from 'react-native';
import {styles} from './ResultPage2Styles';
import {connect} from 'react-redux';
import {Button} from 'react-native-elements';
import {translate} from '../../I18n';
import {ActionSheetCustom as ActionSheet} from 'react-native-custom-actionsheet';
import CameraRoll from '@react-native-community/cameraroll';
import {
  get_captured_image_uri,
  trigger_savings_page,
} from '../../Store/Actions';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import SharedImageBottomComponent from '../../CommonlyUsed/Components/SharedImageBottomComponent';
import {
  CONFETTI_ICON,
  RIGHT_HEADER_ICON,
  CAGATAY,
} from '../../CommonlyUsed/IconIndex';
import {shadow} from '../../CommonlyUsed/CommonlyUsedConstants';
import LottieView from 'lottie-react-native';
import AnimatedProgressComponent from '../../CommonlyUsed/Components/AnimatedProgressComponent';

class ResultPage2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready_to_share: false,
      share_active: false,
      progress: new Animated.Value(0),
      selected_celebrity: '',
    };
  }

  componentWillMount() {
    this.props.navigation.setOptions({
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
    const {selected_celebrity} = this.props.route.params;
    this.setState({selected_celebrity: selected_celebrity});
    const data = await this.performTimeConsumingTask(2000);

    await Animated.timing(this.state.progress, {
      useNativeDriver: true,
      toValue: 1,
      duration: 8000,
      easing: Easing.linear,
    }).start();

    await this.setState({share_active: true});
    if (data !== null) {
      await this.GetScreenShot();
    }
  };

  performTimeConsumingTask = async (timeout) => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve('result');
      }, timeout),
    );
  };

  GoBack = async () => {
    await this.props.navigation.pop();
  };

  Share = async (index) => {
    /** This functions share an image passed using the url param */
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
      await this.SavePicture(this.props.captured_image_uri);
    } else {
      await Share.open(index === 1 ? shareOptions1 : shareOptions2)
        .then(async (res) => {
          console.log('share response: ', res);
          await this.setState({share_active: false});
          await this.actionSheet.hide();
        })
        .catch((err) => {
          err && console.log(err);
          this.setState({share_active: false});
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

  GetScreenShot = async () => {
    const data = await this.performTimeConsumingTask(2000);

    if (data !== null) {
      this.viewShot
        .capture()
        .then(async (uri) => {
          this.setState({share_active: false});
          this.props.get_captured_image_uri(uri);
        })
        .catch(() => {
          this.setState({share_active: false});
        });
    }
  };

  SavePicture = async (uri) => {
    await this.HasAndroidPermission();

    const saveToCameraRollOptions = {
      type: 'photo',
      album: translate('app_name'),
    };

    CameraRoll.save(uri, saveToCameraRollOptions)
      .then(async (res) => {
        this.props.trigger_savings_page();
        Alert.alert(
          translate('result.result_saved'),
          '',
          [
            {
              text: translate('result.okay'),
              onPress: () => this.actionSheet.hide(),
              style: 'cancel',
            },
          ],
          {cancelable: false},
        );
      })
      .catch((err) => {
        console.log('err: ', err);
        this.actionSheet.hide();
      });
  };

  shouldComponentUpdate = async (nextProps, nextState) => {
    if (nextProps.language.languageTag !== this.props.language.languageTag) {
      await this.WhenTheLanguageChanged();
    }
  };

  WhenTheLanguageChanged = () => {
    this.forceUpdate();
  };

  showActionSheet = () => this.actionSheet.show();

  getActionSheetRef = (ref) => (this.actionSheet = ref);

  GetActionSheet = () => {
    return (
      <ActionSheet
        ref={this.getActionSheetRef}
        options={[
          translate('image_picker.cancel'),
          {
            component: (
              <TouchableOpacity
                style={styles.line_container_style}
                onPress={() => this.Share(0)}>
                <Text style={styles.modal_text_style}>
                  {translate('image_picker.save_result')}
                </Text>
              </TouchableOpacity>
            ),
            height: 65,
          },
          {
            component: (
              <TouchableOpacity
                style={styles.line_container_style}
                onPress={() => this.Share(1)}>
                <Text style={styles.modal_text_style}>
                  {translate('image_picker.share_result')}
                </Text>
              </TouchableOpacity>
            ),
            height: 65,
          },
          {
            component: (
              <TouchableOpacity
                style={styles.line_container_style}
                onPress={() => this.Share(2)}>
                <Text style={styles.modal_text_style}>
                  {translate('image_picker.share_app')}
                </Text>
              </TouchableOpacity>
            ),
            height: 65,
          },
        ]}
        cancelButtonIndex={0}
        onPress={this.handlePress}
      />
    );
  };

  render() {
    const {userAvatarSource} = this.props;
    const {share_active, progress, selected_celebrity} = this.state;

    return (
      <View style={styles.scrollViewStyle}>
        <ViewShot
          ref={(ref) => (this.viewShot = ref)}
          options={{format: 'jpg', quality: 0.9}}
          style={styles.viewShotImageStyle}>
          <SafeAreaView style={styles.mainContainer}>
            <LottieView source={CONFETTI_ICON} progress={progress} />

            <View style={[styles.iconContainerStyle, shadow]}>
              <Image source={userAvatarSource} style={styles.iconStyle} />
              <Image source={CAGATAY} style={styles.iconStyle} />
            </View>

            <View style={styles.labelContainerStyle}>
              <Text style={styles.celebrityTextStyle}>
                {selected_celebrity}
              </Text>
              <Text style={styles.celebrityTextStyle}>
                {translate('result.very_similar')}
              </Text>
            </View>

            <AnimatedProgressComponent fill={75} />

            <View
              style={styles.buttonsRowContainerStyle}
              display={!share_active ? 'flex' : 'none'}>
              <Button
                title={translate('result.try_again')}
                buttonStyle={styles.resultButtonStyle}
                titleStyle={{fontSize: 18, fontWeight: '600'}}
                onPress={() => this.GoBack()}
              />

              <Button
                title={translate('result.share')}
                buttonStyle={styles.shareButtonStyle}
                titleStyle={{fontSize: 18, fontWeight: '600'}}
                onPress={() => this.showActionSheet()}
              />
            </View>

            <SharedImageBottomComponent shareActive={share_active} />
          </SafeAreaView>
        </ViewShot>

        {this.GetActionSheet()}
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
    get_captured_image_uri: (image_uri) =>
      dispatch(get_captured_image_uri(image_uri)),
    trigger_savings_page: () => dispatch(trigger_savings_page()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ResultPage2);
