import React, {Component} from 'react';
import {Image, Platform, SafeAreaView, ScrollView, View} from 'react-native';
import {DEVICE_WIDTH} from '../../../CommonlyUsed/Constants';
import {Button} from 'react-native-elements';
import {translate} from '../../../I18n';
import {styles} from './DisplaySavedImageStyles';
import Share from 'react-native-share';
import {connect} from 'react-redux';

class DisplaySavedImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      share_active: false,
    };
  }

  CloseModal = () => {
    const {closeModal} = this.props;
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
        this.setState({share_active: false});
      });
  };

  render() {
    const {image} = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image
            source={{uri: image.uri}}
            style={
              Platform.OS === 'ios'
                ? [
                    styles.imageStyle,
                    {
                      width: DEVICE_WIDTH * 0.85,
                      height:
                        DEVICE_WIDTH * 0.85 * (image.height / image.width),
                    },
                  ]
                : [
                    styles.imageStyle,
                    {
                      width: DEVICE_WIDTH * 0.85,
                      height: DEVICE_WIDTH * 0.85 * 1.8,
                      resizeMode: 'contain',
                    },
                  ]
            }
          />
        </ScrollView>

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
