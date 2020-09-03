import React, {Component} from 'react';
import {Image, ScrollView, Text, StyleSheet, TouchableOpacity, View} from "react-native";
import {DEVICE_HEIGHT, DEVICE_WIDTH, DOWN_ICON, FORWARD_ICON} from "../Constants";
import {page_body_background_color} from "../ColorIndex";
import {translate} from "../../I18n";

class GenderSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_gender_label: translate("home.search_for_all"),
      selected_gender_type: "",
      scroll_items: []
    }
  }

  componentWillMount() {
    const items = [
      {label: translate("home.search_for_all"), type: "all"},
      {label: translate("home.search_male_celebrities"), type: "male"},
      {label: translate("home.search_female_celebrities"), type: "female"}
    ];
    this.fillScroll(items);
  }

  fillScroll = (categories) => {
    const items = categories.map((item) => {
      return (
        <TouchableOpacity style={styles.scrollTextContainer}
                          onPress={() => this.GenderSelected(item.label, item.type)}>
          <Text style={styles.scrollTextStyle}>{item.label}</Text>
        </TouchableOpacity>
      );
    });

    this.setState({scroll_items: items});
  };

  GenderSelected = (label, type) => {
    this.setState({selected_gender_label: label, selected_gender_type: type});
    this.props.handleVisibilitty();
  }

  HandleVisibility = () => {
    this.props.handleVisibilitty();
  }

  render() {
    const {scroll_items, selected_gender_label} = this.state;
    const {visibility, categoriesVisibility} = this.props;

    return (
      <View style={styles.mainContainerStyle} display={!categoriesVisibility ? 'flex' : 'none'}>

        <View style={styles.topLabel2ContainerStyle}>
          <TouchableOpacity style={styles.containerStyle} onPress={() => this.HandleVisibility()}>
            <Text style={styles.selectedTextStyle}>{selected_gender_label}</Text>

            <Image source={selected_gender_label === "" ? DOWN_ICON : FORWARD_ICON} style={{height: 25, width: 25}}/>
          </TouchableOpacity>
        </View>

        <View display={visibility ? 'flex' : 'none'} style={{alignItems: 'center'}}>
          <ScrollView style={{maxHeight: DEVICE_HEIGHT * 0.55}}>
            <View style={styles.scrollViewStyle}>{scroll_items}</View>
          </ScrollView>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainerStyle: {
    marginTop: 15
  },
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: DEVICE_WIDTH * 0.8,
    height: DEVICE_HEIGHT * 0.075,
    padding: 10,
    borderWidth: 0.5,

    borderColor: '#dedede',

    backgroundColor: '#f7f7f7',
  },
  scrollViewStyle: {
    backgroundColor: page_body_background_color,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  scrollTextStyle: {
    fontSize: 15,
    fontWeight: '500',
  },
  selectedTextStyle: {
    fontSize: 15,
    fontWeight: '500',
  },
  scrollTextContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#fff',
    width: DEVICE_WIDTH * 0.8,

    borderTopWidth: 0.45,
    borderLeftWidth: 0.45,
    borderRightWidth: 0.45,
    borderColor: '#dedede',
    padding: 10,
  },
  topLabel2Style: {
    color: '#123456',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'left',
    width: DEVICE_WIDTH * 0.7 - 5,
    height: DEVICE_HEIGHT * 0.071,
  },
  topLabel2ContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: DEVICE_WIDTH * 0.8,
    //backgroundColor: '#dedede'
  },
})
export default GenderSelection;
