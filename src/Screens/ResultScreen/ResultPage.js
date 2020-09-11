import React, {Component} from 'react';
import {
  Image, View, TouchableOpacity, Platform, Easing, PermissionsAndroid, Animated
} from 'react-native';
import {styles} from './ResultPageStyles';
import {connect} from 'react-redux';
import {translate} from '../../I18n';
import {get_captured_image_uri, get_user_avatar_source, trigger_savings_page} from '../../Store/Actions';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import SharedImageBottomComponent from '../../common/Components/SharedImageBottomComponent';
import {RIGHT_HEADER_ICON,} from '../../common/IconIndex';
import * as Animatable from 'react-native-animatable';
import ResultButtonsRow from "../../common/Components/ResultButtonsRow";
import ActionSheetComponent2 from "../../common/Components/ActionSheetComponent2";
import {SavePicture} from "../../common/Functions/SavePicture";
import ResultPageBody from "./ResultPageBody/ResultPageBody";
import Swiper from "react-native-swiper";

const ANIMATION_DURATION = 1200;

class ResultPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready_to_share: false,
      share_active: false,
      progress: new Animated.Value(0),
      data: this.props.route.params.data,
      isVisible: false,
      swiper_index: 0,
      captured_image: ""
    };
  }

  componentWillMount = async () => {
    this.props.navigation.setOptions({
      title: translate('app_name'),
      headerRight: () => (
        <TouchableOpacity onPress={() => this.props.navigation.navigate('SavingsPage', {tab_index: 0})}>
          <Image source={RIGHT_HEADER_ICON} style={{height: 35, width: 35, marginRight: 15}}/>
        </TouchableOpacity>
      ),
    });
  }

  componentDidMount = async () => {
    await this.ScrollAnimation();
  };

  takeScreenShot = async (index) => {
    await this.actionSheet.hide();
    const data = await this.performTimeConsumingTask(2000);
    await this.setState({share_active: true});
    if (data !== null) {
      await this.GetScreenShot(index);
    }
  };

  ScrollAnimation = async () => {
    const data = await this.performTimeConsumingTask(2000);
    await this.ref3.scrollTo(1, true);

    if (data !== null) {
      await this.ref3.scrollTo(0, true);
    }
  }

  performTimeConsumingTask = async (timeout) => {
    return new Promise((resolve) => setTimeout(() => {
      resolve('result');
    }, timeout));
  };


  Save = async (uri) => {
    if (Platform.OS === 'android') {
      await this.HasAndroidPermission().then((res) => {
        return !res;
      });
    }

    await SavePicture(uri, this.HasAndroidPermission, this.props.trigger_savings_page, this.actionSheet.hide);
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
      })
      .catch((err) => {
        err && console.log(err);
        this.setState({share_active: false});
        this.ref2.zoomInUp(ANIMATION_DURATION);
        this.actionSheet.hide();
      });
  };

  ShareResult = async (captured_uri) => {
    /** This functions share an image passed using the url param */
    const shareOptions = Platform.OS === 'ios'
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
      if (index === 2)
        await this.ShareApp();
      else
        await this.takeScreenShot(index);
    } catch (e) {
      console.log("Error takeScreenShot: ", e);
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
    const data = await this.performTimeConsumingTask(2000);

    if (data !== null) {
      this.viewShot.capture()
        .then(async (uri) => {
          this.setState({share_active: false});
          this.ref2.zoomInUp(ANIMATION_DURATION);
          await this.setState({"captured_image": uri});
          this.props.get_captured_image_uri(uri);
          if (index === 0)
            await this.Save(uri);
          else {
            await this.ShareResult(uri);
          }
        })
        .catch(() => {
          this.setState({share_active: false});
          this.ref2.zoomInUp(ANIMATION_DURATION);
        });
    }
  };

  shouldComponentUpdate = async (nextProps, nextState) => {
    if (nextProps.language.languageTag !== this.props.language.languageTag) {
      await this.WhenTheLanguageChanged();
    }
  };

  WhenTheLanguageChanged = () => this.forceUpdate();

  showActionSheet = () => this.actionSheet.show();

  getActionSheetRef = (ref) => (this.actionSheet = ref);

  GoBack = async () => await this.props.navigation.pop();

  GetActionSheet = () => {
    return (
      <ActionSheetComponent2 launchImageLibrary={this.LaunchImageLibrary}
                             launchCamera={this.LaunchCamera}
                             handlePress={this.handlePress}
                             Share={(index) => this.ActionHandler(index)}
                             getActionSheetRef={this.getActionSheetRef}/>
    );
  };

  render() {
    const {userAvatarSource} = this.props;
    const {share_active, data} = this.state;

    return (
      <View style={styles.scrollViewStyle}>
        <ViewShot ref={(ref) => (this.viewShot = ref)}
                  options={{format: 'jpg', quality: 0.9}}
                  style={styles.viewShotImageStyle}>

          <Swiper ref={ref => (this.ref3 = ref)}
                  style={{}}
                  autoplay={false}
                  index={this.state.swiper_index}
                  showsButtons={false}
                  dotStyle={{height: 7, width: 7}}
                  activeDotStyle={{height: 7, width: 7}}
                  activeDotColor={'#1490E3'}
                  dotColor={'#2a2a2a'}
                  onIndexChanged={(index) => {
                    console.log("çalıştı")
                  }}
                  loop={false}>
            <ResultPageBody userAvatarSource={userAvatarSource}
                            titleIndex={0}
                            data={data[0]}/>

            <ResultPageBody userAvatarSource={userAvatarSource}
                            titleIndex={1}
                            data={data[1]}/>

            <ResultPageBody userAvatarSource={userAvatarSource}
                            titleIndex={2}
                            data={data[2]}/>
          </Swiper>

          <Animatable.View ref={ref => (this.ref2 = ref)} easing={'linear'}>
            <ResultButtonsRow share_active={share_active} showActionSheet={this.showActionSheet} goBack={this.GoBack}/>
          </Animatable.View>

          <Animatable.View ref={ref => (this.ref1 = ref)} easing={'linear'}>
            <SharedImageBottomComponent shareActive={share_active}/>
          </Animatable.View>
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
    get_user_avatar_source: (source, base64_data) => dispatch(get_user_avatar_source(source, base64_data)),
    get_captured_image_uri: (image_uri) => dispatch(get_captured_image_uri(image_uri)),
    trigger_savings_page: () => dispatch(trigger_savings_page()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultPage);
