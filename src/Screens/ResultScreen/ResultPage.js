import React, {Component} from 'react';
import {
  Image, View, Text, TouchableOpacity, Platform, Easing, PermissionsAndroid, SafeAreaView, Animated
} from 'react-native';
import {styles} from './ResultPageStyles';
import {connect} from 'react-redux';
import {translate} from '../../I18n';
import {get_captured_image_uri, get_user_avatar_source, trigger_savings_page} from '../../Store/Actions';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import SharedImageBottomComponent from '../../common/Components/SharedImageBottomComponent';
import {RIGHT_HEADER_ICON,} from '../../common/IconIndex';
import {shadow} from '../../common/Constants';
import * as Animatable from 'react-native-animatable';
import ResultButtonsRow from "../../common/Components/ResultButtonsRow";
import AnimatedProgressBar from "../../common/Components/AnimatedProgressBar";
import AnimatedProgressComponent from "../../common/Components/AnimatedProgressComponent";
import ActionSheetComponent2 from "../../common/Components/ActionSheetComponent2";
import {SavePicture} from "../../common/Functions/SavePicture";
import SwipeableImageModal from "../../common/Components/SwipeableImageModal";
import ResultLineComponent from "../../common/Components/ResultLineComponent";
import {GetUserAge} from "../../common/Functions/GetUserAge";

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
      modal_uri: ""
    };
  }

  componentWillMount() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => this.props.navigation.navigate('SavingsPage', {tab_index: 0})}>
          <Image source={RIGHT_HEADER_ICON} style={{height: 35, width: 35, marginRight: 15}}/>
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

  Share = async (index) => {
    /** This functions share an image passed using the url param */
    const shareOptions1 = Platform.OS === 'ios'
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
      await SavePicture(this.props.captured_image_uri, () => this.HasAndroidPermission(), () => this.props.trigger_savings_page(), () => this.actionSheet.hide());
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
      this.viewShot.capture()
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

  shouldComponentUpdate = async (nextProps, nextState) => {
    if (nextProps.language.languageTag !== this.props.language.languageTag) {
      await this.WhenTheLanguageChanged();
    }
  };

  WhenTheLanguageChanged = () => this.forceUpdate();

  showActionSheet = () => this.actionSheet.show();

  getActionSheetRef = (ref) => (this.actionSheet = ref);

  GoBack = async () => {
    await this.props.navigation.pop();
  }

  GetActionSheet = () => {
    return (
      <ActionSheetComponent2 launchImageLibrary={this.LaunchImageLibrary}
                             launchCamera={this.LaunchCamera}
                             handlePress={this.handlePress}
                             Share={(index) => this.Share(index)}
                             getActionSheetRef={this.getActionSheetRef}/>
    );
  };

  handleModalVisibility = (index) => {
    const {isVisible, data} = this.state;
    const {userAvatarSource} = this.props;

    if (index === 0) {
      this.setState({isVisible: !isVisible, modal_uri: userAvatarSource, index: index});
    }

    if (index === 1) {
      this.setState({isVisible: !isVisible, modal_uri: data.celebrity.photo, index: index});
    }
  }

  render() {
    const {userAvatarSource} = this.props;
    const {share_active, data, isVisible, modal_uri, index} = this.state;
    const hide_age = data.celebrity.birthday === null || data.celebrity.birthday === "" || typeof data.celebrity.birthday === 'undefined';

    return (
      <View style={styles.scrollViewStyle}>
        <ViewShot ref={(ref) => (this.viewShot = ref)}
                  options={{format: 'jpg', quality: 0.9}}
                  style={styles.viewShotImageStyle}>

          <SafeAreaView style={styles.mainContainer}>

            <View style={[styles.iconContainerStyle, shadow]}>
              <TouchableOpacity onPress={() => this.handleModalVisibility(0)}>
                <Image source={userAvatarSource} style={styles.iconStyle}/>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.handleModalVisibility(1)}>
                <Image source={{uri: data.celebrity.photo}} style={styles.iconStyle}/>
              </TouchableOpacity>
            </View>

            <View style={{alignItems: 'center'}}>
              <Text style={{fontWeight: '500', fontSize: 17}}>{translate("result.similarity_rate")}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <AnimatedProgressBar fill={data.percentage}/>
                <AnimatedProgressComponent fill={data.percentage}/>
              </View>
            </View>

            <View style={styles.labelContainerStyle}>

              <ResultLineComponent leftText={translate("result.celebrity") + ": "}
                                   rightText={data.celebrity.name}/>

              <View display={hide_age ? "none" : 'flex'} style={{marginRight: 25}}>
                <ResultLineComponent leftText={translate("result.birthday") + ": "}
                                     rightText={data.celebrity.birthday + ", " + GetUserAge(data.celebrity.birthday) + " " + translate("result.years")}/>
              </View>
              <ResultLineComponent leftText={translate("result.profession") + ": "}
                                   rightText={data.celebrity.profession}/>

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

        <SwipeableImageModal uri={modal_uri}
                             index={index}
                             isVisible={isVisible}
                             handleVisibility={() => this.handleModalVisibility(index)}/>
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
