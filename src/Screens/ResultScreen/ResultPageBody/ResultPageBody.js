import React, {Component} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {styles} from "./ResultPageBodyStyles";
import {HEADSTONE2, shadow} from "../../../common/Constants";
import {translate} from "../../../I18n";
import AnimatedProgressBar from "../../../common/Components/AnimatedProgressBar";
import AnimatedProgressComponent from "../../../common/Components/AnimatedProgressComponent";
import ResultLineComponent from "../../../common/Components/ResultLineComponent";

class ResultPageBody extends Component {
  render() {
    const {userAvatarSource, data, hide_age, grave_flex, age, birthday, nationality, category, star_sign, handleModalVisibility} = this.props;

    return (
      <View style={styles.mainContainer}>

        <View style={[styles.iconContainerStyle, shadow]}>
          <TouchableOpacity onPress={() => handleModalVisibility(0)}>
            <Image source={userAvatarSource} style={styles.iconStyle}/>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleModalVisibility(1)}>
            <Image source={{uri: data.celebrity.photo}} style={styles.iconStyle}/>
          </TouchableOpacity>
        </View>

        <View style={{alignItems: 'center'}}>
          <Text
            style={{fontWeight: '500', fontSize: 17, marginTop: 15}}>{translate("result.similarity_rate")}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AnimatedProgressBar fill={data.percentage}/>
            <AnimatedProgressComponent fill={data.percentage}/>
          </View>
        </View>

        <ScrollView style={styles.labelContainerStyle}>

          <ResultLineComponent leftText={translate("result.celebrity") + ": "} rightText={data.celebrity.name}/>

          <View display={hide_age ? "none" : 'flex'} style={{flexDirection: 'row', marginRight: 25}}>
            <ResultLineComponent leftText={translate("result.birthday") + ": "}
                                 rightText={birthday + ", " + age + " " + translate("result.years")}/>

            <View display={grave_flex ? "flex" : "none"}>
              <Image style={styles.graveIconStyle} source={HEADSTONE2}/>
            </View>
          </View>

          <ResultLineComponent leftText={translate("result.category") + ": "}
                               rightText={category}/>

          <ResultLineComponent leftText={translate("result.nationality") + ": "}
                               rightText={nationality}/>

          <ResultLineComponent leftText={translate("result.zodiac_sign") + ": "}
                               rightText={star_sign}/>
        </ScrollView>

      </View>

    );
  }
}

export default ResultPageBody;
