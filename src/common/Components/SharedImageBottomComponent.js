import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';
import {styles} from './SharedImageBottomComponentStyles';
import {translate} from '../../I18n';

const APP_STORE_ICON = require('../../assets/icons/hikdemis_appstore.png');
const PLAY_STORE_ICON = require('../../assets/icons/hikdemis_playstore.png');
const HIK_DEMIS = require('../../assets/icons/banner.png');

class SharedImageBottomComponent extends Component {
  render() {
    const {shareActive} = this.props;

    return (
      <View
        display={shareActive ? 'flex' : 'none'}
        style={styles.turkaiContainerStyle}>
        <View style={styles.appLogoContainerStyles}>
          <Image source={HIK_DEMIS} style={styles.appLogoImageStyle} />
          <Text style={styles.hikdemisTextStyle}>{translate('app_name')}</Text>
        </View>

        <View style={styles.turkaiRowContainerStyle}>
          <Image source={APP_STORE_ICON} style={styles.storeImageStyle} />
          <Image source={PLAY_STORE_ICON} style={styles.storeImageStyle} />
        </View>
      </View>
    );
  }
}

export default SharedImageBottomComponent;
