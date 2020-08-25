import React, {Component} from 'react';
import {WebView} from 'react-native-webview';
import {SafeAreaView, StyleSheet} from 'react-native';
import {DEVICE_WIDTH} from '../../CommonlyUsed/Constants';

class WebViewPage extends Component {
  render() {
    const {url} = this.props.route.params;
    console.log('URL: ', url);

    return (
      <SafeAreaView style={styles.container}>
        <WebView source={{uri: url}} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: DEVICE_WIDTH * 0.95,
    marginLeft: DEVICE_WIDTH * 0.025,
    paddingVertical: 10,
  },
});

export default WebViewPage;
