import React, {Component} from 'react';
import {Image, View, Text, SafeAreaView, TouchableOpacity} from "react-native";
import {styles} from "./Slide1Styles";
import {connect} from "react-redux";
import {translate} from "../../../I18n";
import {GENERIC_USER} from "../../../CommonlyUsed/IconIndex";

const DOT_ICON = require('../../../assets/icons/dot_icon.png');

class Slide1 extends Component {

    constructor() {
        super();
        this.state = {}
    }

    Continue = async () => {
        this.props.navigation.navigate("AgreementsPage");
    };

    render() {
        return (
            <SafeAreaView style={styles.mainContainerStyle}>
                <View style={styles.iconsRowContainerStyle}>
                    <View style={styles.iconWrapperStyle}>
                        <Image source={GENERIC_USER} style={styles.iconStyle}/>
                    </View>

                    <Image source={require('../../../assets/icons/compare_icon.png')} style={styles.compareIconStyle}/>

                    <View style={[styles.emojiIconWrapperStyle]}>
                        <Image source={require('../../../assets/icons/Emoji/sad_emoji2.png')}
                               style={styles.emojiIconStyle}/>
                        <Image source={require('../../../assets/icons/Emoji/angry_emoji2.png')}
                               style={styles.emojiIconStyle}/>

                    </View>
                    <View style={styles.emojiIconWrapperStyle}>
                        <Image source={require('../../../assets/icons/Emoji/happy_emoji.png')}
                               style={styles.emojiIconStyle}/>
                        <Image source={require('../../../assets/icons/Emoji/bored_emoji.png')}
                               style={styles.emojiIconStyle}/>

                    </View>
                </View>
                <View style={styles.containerStyle}>

                    <View style={styles.rowContainerStyle}>
                        <Image source={DOT_ICON} style={styles.dotImageStyle}/>
                        <Text style={styles.textStyle}>{translate("slide1.line1")}</Text>
                    </View>

                    <View style={styles.rowContainerStyle}>
                        <Image source={DOT_ICON} style={styles.dotImageStyle}/>
                        <Text style={styles.textStyle}>{translate("slide1.line2")}</Text>
                    </View>

                    <View style={styles.rowContainerStyle}>
                        <Image source={DOT_ICON} style={styles.dotImageStyle}/>
                        <Text style={styles.textStyle}>{translate("slide1.line3")}</Text>
                    </View>

                </View>

            </SafeAreaView>

        );
    }
}

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(null, mapDispatchToProps)(Slide1);
