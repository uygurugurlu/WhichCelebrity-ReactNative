import React, {Component} from 'react';
import {Image, View, Text, SafeAreaView, TouchableOpacity} from "react-native";
import {styles} from "./Slide2Styles";
import {connect} from "react-redux";
import {translate} from "../../../I18n";
import {GENERIC_USER} from "../../../CommonlyUsed/IconIndex";

const DOT_ICON = require('../../../assets/icons/dot_icon.png');

class Slide2 extends Component {

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

                    <View style={styles.iconWrapperStyle}>
                        <Image source={GENERIC_USER} style={styles.iconStyle}/>
                    </View>
                </View>

                <View style={styles.containerStyle}>

                    <View style={styles.rowContainerStyle}>
                        <Image source={DOT_ICON} style={styles.dotImageStyle}/>
                        <Text style={styles.textStyle}>{translate("slide2.line1")}</Text>
                    </View>

                    <View style={styles.rowContainerStyle}>
                        <Image source={DOT_ICON} style={styles.dotImageStyle}/>
                        <Text style={styles.textStyle}>{translate("slide2.line2")}</Text>
                    </View>
                </View>

            </SafeAreaView>

        );
    }
}

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(null, mapDispatchToProps)(Slide2);
