import React, {Component} from 'react';
import {
  Image, View, Text, TouchableOpacity, Platform, Easing,
  PermissionsAndroid, Alert, SafeAreaView, Animated,
} from 'react-native';
import {styles} from './ResultPageStyles';
import {connect} from 'react-redux';
import {translate} from '../../I18n';
import {ActionSheetCustom as ActionSheet} from 'react-native-custom-actionsheet';
import CameraRoll from '@react-native-community/cameraroll';
import {get_captured_image_uri, trigger_savings_page,} from '../../Store/Actions';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import SharedImageBottomComponent from '../../CommonlyUsed/Components/SharedImageBottomComponent';
import {CONFETTI_ICON, RIGHT_HEADER_ICON, CAGATAY,} from '../../CommonlyUsed/IconIndex';
import {shadow} from '../../CommonlyUsed/Constants';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import ResultButtonsRow from "../../CommonlyUsed/Components/ResultButtonsRow";
import AnimatedProgressBar from "../../CommonlyUsed/Components/AnimatedProgressBar";
import AnimatedProgressComponent from "../../CommonlyUsed/Components/AnimatedProgressComponent";

const ANIMATION_DURATION = 1200;

class ResultPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready_to_share: false,
      share_active: false,
      progress: new Animated.Value(0),
      data: this.props.route.params.data
    };
  }

  componentWillMount() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() =>
          this.props.navigation.navigate('SavingsPage', {tab_index: 0})
        }>
          <Image source={RIGHT_HEADER_ICON}
                 style={{height: 35, width: 35, marginRight: 15}}/>
        </TouchableOpacity>
      ),
    });
  }

  componentDidMount = async () => {
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
          this.ref2.zoomInUp(ANIMATION_DURATION);
          await this.actionSheet.hide();
        })
        .catch((err) => {
          err && console.log(err);
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

  GetScreenShot = async () => {
    const data = await this.performTimeConsumingTask(2000);

    if (data !== null) {
      this.viewShot
        .capture()
        .then(async (uri) => {
          this.setState({share_active: false});
          this.ref2.zoomInUp(ANIMATION_DURATION);
          this.props.get_captured_image_uri(uri);
        })
        .catch(() => {
          this.setState({share_active: false});
          this.ref2.zoomInUp(ANIMATION_DURATION);
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
    const {share_active, progress, data} = this.state;
    console.log("ResultPage data: ", data);

    return (
      <View style={styles.scrollViewStyle}>
        <ViewShot ref={(ref) => (this.viewShot = ref)}
                  options={{format: 'jpg', quality: 0.9}}
                  style={styles.viewShotImageStyle}>
          <SafeAreaView style={styles.mainContainer}>

            <View style={styles.labelContainerStyle}>
              <Text style={styles.resultLabelStyle}>
                {translate('famous_compare.result_label')}
              </Text>
              <Text style={styles.celebrityTextStyle}>{data.celebrity.name}</Text>
            </View>

            <View style={[styles.iconContainerStyle, shadow]}>
              <Image source={userAvatarSource} style={styles.iconStyle}/>

              <Image source={{uri: data.celebrity.photo}} style={styles.iconStyle}/>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <AnimatedProgressBar fill={data.percentage}/>
              <AnimatedProgressComponent fill={data.percentage}/>
            </View>

            <View style={styles.labelContainerStyle}>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.resultLeftTextStyle}>{"Ünlü: "}</Text>
                <Text style={styles.resultRightTextStyle}>{data.celebrity.name}</Text>
              </View>

              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.resultLeftTextStyle}>{"Yaş: "}</Text>
                <Text style={styles.resultRightTextStyle}>{data.age}</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.resultLeftTextStyle}>{"Meslek: "}</Text>
                <Text style={styles.resultRightTextStyle}>{data.celebrity.profession}</Text>
              </View>
            </View>

            <Animatable.View ref={ref => (this.ref2 = ref)} easing={'linear'}>
              <ResultButtonsRow share_active={share_active}
                                showActionSheet={this.showActionSheet}
                                goBack={this.GoBack}/>
            </Animatable.View>

            <Animatable.View ref={ref => (this.ref1 = ref)} easing={'linear'}>
              <SharedImageBottomComponent shareActive={share_active}/>
            </Animatable.View>

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
export default connect(mapStateToProps, mapDispatchToProps)(ResultPage);
