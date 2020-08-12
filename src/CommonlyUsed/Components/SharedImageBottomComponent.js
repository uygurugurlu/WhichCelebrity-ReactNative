import React, {Component} from 'react';
import {Image, Text, View} from "react-native";
import {styles} from "./SharedImageBottomComponentStyles";
import {translate} from "../../I18n";

const APP_STORE_ICON = require('../../assets/icons/hikdemis_appstore.png');
const PLAY_STORE_ICON = require('../../assets/icons/hikdemis_playstore.png');
const TURK_AI = require('../../assets/icons/turkai_logo.png');
const HIK_DEMIS = require('../../assets/icons/hikdemis_icon.png');

class SharedImageBottomComponent extends Component {

    render() {
        const {shareActive} = this.props;

        return (
            <View display={shareActive ? 'flex' : 'none'} style={styles.turkaiContainerStyle}>
                <View style={styles.turkaiRowContainerStyle}>
                    <View
                        style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                        <Image source={HIK_DEMIS} style={styles.hikdemisImageStyle}/>
                        <Text style={styles.hikdemisTextStyle}>{translate("app_name")}</Text>
                    </View>
                    <Image source={APP_STORE_ICON} style={styles.storeImageStyle}/>
                    <Image source={PLAY_STORE_ICON} style={styles.storeImageStyle}/>
                </View>

                <Image source={TURK_AI} style={styles.turkaiLogoStyle}/>
            </View>
        );
    }
}

export default SharedImageBottomComponent;
