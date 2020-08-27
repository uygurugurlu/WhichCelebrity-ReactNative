import React, {Component} from 'react';
import {
  Image, View, Text, TouchableOpacity, Platform, Easing, PermissionsAndroid, SafeAreaView, Animated,
} from 'react-native';
import {styles} from './ResultPage2Styles';
import {connect} from 'react-redux';
import {translate} from '../../I18n';
import {get_captured_image_uri, trigger_savings_page} from '../../Store/Actions';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import SharedImageBottomComponent from '../../CommonlyUsed/Components/SharedImageBottomComponent';
import {RIGHT_HEADER_ICON} from '../../CommonlyUsed/IconIndex';
import {shadow} from '../../CommonlyUsed/Constants';
import AnimatedProgressComponent from '../../CommonlyUsed/Components/AnimatedProgressComponent';
import * as Animatable from "react-native-animatable";
import ResultButtonsRow from "../../CommonlyUsed/Components/ResultButtonsRow";
import AnimatedProgressBar from "../../CommonlyUsed/Components/AnimatedProgressBar";
import ActionSheetComponent2 from "../../CommonlyUsed/Components/ActionSheetComponent2";
import {SavePicture} from "../../CommonlyUsed/Functions/SavePicture";

const ANIMATION_DURATION = 1200;

class ResultPage2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready_to_share: false,
      share_active: false,
      progress: new Animated.Value(0),
      celebrity_photo: this.props.route.params.celebrity_photo,
      celebrity_name: this.props.route.params.celebrity_name,
      data: this.props.route.params.data,
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
    const {celebrity_photo, celebrity_name} = this.props.route.params;
    this.setState({celebrity_photo: celebrity_photo, celebrity_name: celebrity_name})
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

  GoBack = async () => await this.props.navigation.pop();

  WhenTheLanguageChanged = () => this.forceUpdate();

  showActionSheet = () => this.actionSheet.show();

  getActionSheetRef = (ref) => (this.actionSheet = ref);

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

  shouldComponentUpdate = async (nextProps, nextState) => {
    if (nextProps.language.languageTag !== this.props.language.languageTag) {
      await this.WhenTheLanguageChanged();
    }
  };


  GetActionSheet = () => {
    return (
      <ActionSheetComponent2 launchImageLibrary={this.LaunchImageLibrary}
                             launchCamera={this.LaunchCamera}
                             handlePress={this.handlePress}
                             Share={(index) => this.Share(index)}
                             getActionSheetRef={this.getActionSheetRef}/>
    );
  };

  render() {
    const {userAvatarSource} = this.props;
    const {share_active, celebrity_name, celebrity_photo, data} = this.state;

    return (
      <View style={styles.scrollViewStyle}>
        <ViewShot ref={(ref) => (this.viewShot = ref)}
                  options={{format: 'jpg', quality: 0.9}}
                  style={styles.viewShotImageStyle}>
          <SafeAreaView style={styles.mainContainer}>

            <View style={[styles.iconContainerStyle, shadow]}>
              <Image source={userAvatarSource} style={styles.iconStyle}/>
              <Image source={{uri: celebrity_photo}} style={styles.iconStyle}/>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <AnimatedProgressBar fill={data.percentage}/>
              <AnimatedProgressComponent fill={data.percentage}/>
            </View>

            <View style={styles.labelContainerStyle}>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.resultLeftTextStyle}>{"Ünlü: "}</Text>
                <Text style={styles.resultRightTextStyle}>{celebrity_name}</Text>
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

            <Animatable.View>
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
    get_captured_image_uri: (image_uri) => dispatch(get_captured_image_uri(image_uri)),
    trigger_savings_page: () => dispatch(trigger_savings_page()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ResultPage2);
