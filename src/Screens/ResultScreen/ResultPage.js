import React, {Component} from 'react';
import {
  Image, View, Text, TouchableOpacity, Platform, Easing, PermissionsAndroid, SafeAreaView, Animated, ScrollView
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
import SwipeableImageModal from "../../common/Components/SwipeableImageModal";
import ResultPageBody from "./ResultPageBody/ResultPageBody";
import Swiper from "react-native-swiper";

const ANIMATION_DURATION = 1200;

class ResultPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready_to_share: false,
      share_active: true,
      progress: new Animated.Value(0),
      data: this.props.route.params.data,
      isVisible: false,
      modal_uri: "",
      nationality: "",
      category: "",
      star_sign: "",
      hide_age: "",
      grave_flex: "",
      age: "",
      birthday: "",
      swiper_index: 0
    };
  }

  componentWillMount = async () => {
    const {data} = this.props.route.params;
    let nationality = "", category = "", star_sign = "", hide_age = "", grave_flex = "", age = "", birthday = "";

    this.props.navigation.setOptions({
      title: translate('app_name'),
      headerRight: () => (
        <TouchableOpacity onPress={() => this.props.navigation.navigate('SavingsPage', {tab_index: 0})}>
          <Image source={RIGHT_HEADER_ICON} style={{height: 35, width: 35, marginRight: 15}}/>
        </TouchableOpacity>
      ),
    });

    hide_age = data.celebrity.birthday === null || data.celebrity.birthday === "" || typeof data.celebrity.birthday === 'undefined';
    grave_flex = typeof data.celebrity.dead !== 'undefined' && data.celebrity.dead !== null && data.celebrity.dead;
    age = typeof (data.celebrity.age !== 'undefined' && data.celebrity.age !== null) ? data.celebrity.age : "";
    birthday = typeof (data.celebrity.birthday !== 'undefined' && data.celebrity.birthday !== null) ? data.celebrity.birthday : "";

    try {
      nationality = typeof (data.celebrity.nationality !== 'undefined' && data.celebrity.nationality !== null) ? data.celebrity.nationality.name : "";
    } catch (e) {
      console.log("Error componentWillMount: ", e);
      nationality = "";
    }

    try {
      category = typeof (data.celebrity.category !== 'undefined' && data.celebrity.category !== null) ? data.celebrity.category.name : "";
    } catch (e) {
      category = "";
    }

    try {
      star_sign = typeof (data.celebrity.star_sign !== 'undefined' && data.celebrity.star_sign !== null) ? data.celebrity.star_sign.name : "";
    } catch (e) {
      star_sign = "";
    }

    this.setState({
      category: category,
      nationality: nationality,
      star_sign: star_sign,
      grave_flex: grave_flex,
      hide_age: hide_age,
      age: age,
      birthday: birthday
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

    await this.ScrollAnimation();
  };

  ScrollAnimation = async () => {
    const data = await this.performTimeConsumingTask(2000);
    await this.ref3.scrollTo(0.3, true);

    if (data !== null) {
      await this.ref3.scrollTo(0.1, true);
    }

  }

  performTimeConsumingTask = async (timeout) => {
    return new Promise((resolve) => setTimeout(() => {
      resolve('result');
    }, timeout));
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

  GoBack = async () => await this.props.navigation.pop();

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
    const {share_active, data, hide_age, grave_flex, age, birthday, isVisible, modal_uri, index, nationality, category, star_sign} = this.state;

    return (
      <View style={styles.scrollViewStyle}>
        <ViewShot ref={(ref) => (this.viewShot = ref)}
                  options={{format: 'jpg', quality: 0.9}}
                  style={styles.viewShotImageStyle}>

          <Swiper
            ref={ref => (this.ref3 = ref)}
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
                            data={data}
                            hide_age={hide_age}
                            grave_flex={grave_flex}
                            age={age}
                            birthday={birthday}
                            nationality={nationality}
                            category={category}
                            handleModalVisibility={(index) => this.handleModalVisibility(index)}
                            star_sign={star_sign}/>

            <ResultPageBody userAvatarSource={userAvatarSource}
                            data={data}
                            hide_age={hide_age}
                            grave_flex={grave_flex}
                            age={age}
                            birthday={birthday}
                            nationality={nationality}
                            category={category}
                            handleModalVisibility={(index) => this.handleModalVisibility(index)}
                            star_sign={star_sign}/>
          </Swiper>

          <Animatable.View ref={ref => (this.ref2 = ref)} easing={'linear'}>
            <ResultButtonsRow share_active={share_active} showActionSheet={this.showActionSheet} goBack={this.GoBack}/>
          </Animatable.View>

          <Animatable.View ref={ref => (this.ref1 = ref)} easing={'linear'}>
            <SharedImageBottomComponent shareActive={share_active}/>
          </Animatable.View>
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
