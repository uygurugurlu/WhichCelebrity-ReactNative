import React, {Component} from 'react';
import {Image, Platform, SafeAreaView, View} from 'react-native';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../../common/Constants';
import {Button} from 'react-native-elements';
import {translate} from '../../../I18n';
import {styles} from './DisplaySavedImageStyles';
import Share from 'react-native-share';
import {connect} from 'react-redux';
import ImageZoom from 'react-native-image-pan-zoom';
import crashlytics from '@react-native-firebase/crashlytics';

class DisplaySavedImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      share_active: false,
    };
  }

  CloseModal = () => {
    const {closeModal} = this.props;
    console.log('CloseModal çalıştı.');
    closeModal();
  };

  Share = async () => {
    const {image} = this.props;

    let regex = /:\/\/(.{36})\//i;
    let result = image.uri.match(regex);

    /** This functions share an image passed using the url param */
    const shareOptions =
      Platform.OS === 'ios'
        ? {
            title: 'Hık Demiş',
            url:
              'assets-library://asset/asset.JPG?id=' + result[1] + '&ext=JPG',
            subject: 'Hık Demiş', // for email,
            failOnCancel: false,
          }
        : {
            title: 'Hık Demiş',
            url: image.uri,
            message: 'https://appfabhikdemis.page.link/H3Ed',
            subject: 'Hık Demiş', // for email,
            failOnCancel: false,
          };

    await Share.open(shareOptions)
      .then(async (res) => {
        console.log('share response: ', res);
        await this.setState({share_active: false});
      })
      .catch((err) => {
        err && console.log(err);
        crashlytics().recordError(err);
        this.setState({share_active: false});
      });
  };

  render() {
    const {image} = this.props;
    const IOS_HEIGHT = DEVICE_WIDTH * 0.75 * (image.height / image.width);
    const ANDROID_HEIGHT = DEVICE_WIDTH * 0.75 * 1.8;

    return (
      <SafeAreaView style={styles.container}>
        <ImageZoom
          cropWidth={DEVICE_WIDTH * 0.9}
          imageWidth={DEVICE_WIDTH * 0.9}
          style={{marginTop: DEVICE_HEIGHT * 0.05}}
          cropHeight={Platform.OS === 'ios' ? IOS_HEIGHT : ANDROID_HEIGHT}
          imageHeight={Platform.OS === 'ios' ? IOS_HEIGHT : ANDROID_HEIGHT}>
          <Image
            source={{uri: image.uri}}
            style={
              Platform.OS === 'ios'
                ? [styles.imageStyle, {height: IOS_HEIGHT}]
                : [
                    styles.imageStyle,
                    {height: ANDROID_HEIGHT, resizeMode: 'contain'},
                  ]
            }
          />
        </ImageZoom>

        <View style={styles.buttonContainerStyle}>
          <Button
            title={translate('display.cancel')}
            buttonStyle={styles.cancelButtonStyle}
            titleStyle={styles.cancelButtonTitleStyle}
            onPress={() => this.CloseModal()}
          />

          <Button
            title={translate('display.share')}
            buttonStyle={styles.shareButtonStyle}
            titleStyle={styles.shareButtonTitleStyle}
            onPress={() => this.Share()}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.mainReducer.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(DisplaySavedImage);
