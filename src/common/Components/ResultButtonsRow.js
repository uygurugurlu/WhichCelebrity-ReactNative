import React, {Component} from 'react';
import {StyleSheet, View} from "react-native";
import {Button} from "react-native-elements";
import {translate} from "../../I18n";
import {DEVICE_WIDTH} from "../Constants";
import {buttons_height} from "../ColorIndex";

class ResultButtonsRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {share_active, showActionSheet, goBack} = this.props;
    return (
      <View style={styles.buttonsRowContainerStyle} display={!share_active ? 'flex' : 'none'}>
        <Button title={translate('result.try_again')}
                buttonStyle={styles.resultButtonStyle}
                titleStyle={{fontSize: 18, fontWeight: '600'}}
                onPress={goBack}/>

        <Button title={translate('result.share')}
                buttonStyle={styles.shareButtonStyle}
                titleStyle={{fontSize: 18, fontWeight: '600'}}
                onPress={showActionSheet}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonsRowContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
  },
  resultButtonStyle: {
    width: DEVICE_WIDTH * 0.38,
    height: buttons_height,
    borderRadius: 10,
    fontWeight: '600',
    backgroundColor: '#123456',
  },
  shareButtonStyle: {
    width: DEVICE_WIDTH * 0.38,
    height: buttons_height,
    borderRadius: 10,
    fontWeight: '600',
    backgroundColor: '#123456',
    marginLeft: DEVICE_WIDTH * 0.05,
  },
});

export default ResultButtonsRow;
