import React from 'react' ;
import {Platform, Image} from 'react-native';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from "../Constants";
import shorthash from 'shorthash';

const RNFS = require('react-native-fs');

class CacheImageComponent extends React.Component {
  state = {
    source: "",
    error: false,
    width: 0,
    height: 0,
    path: ""
  };

  loadFile = async (path) => {
    console.log("loadFile");
    await this.setState({source: {uri: path}});
    await this.GetImageSize(path);
  };

  downloadFile(uri, path) {
    RNFS.downloadFile({fromUrl: uri, toFile: path, cacheable: true, background: false, progressDivider: 1}).promise
      .then(res => {
        this.loadFile(path);
      });
  };

  componentWillMount() {
    const {uri} = this.props;
    const name = shorthash.unique(uri);
    const extension = (Platform.OS === 'android') ? 'file://' : '';
    const path = `${extension}${RNFS.CachesDirectoryPath}/${name}.png`;

    RNFS.exists(path).then(exists => {
      if (exists) this.loadFile(path);
      else this.downloadFile(uri, path);
    });

    this.setState({path: path});
  }

  GetImageSize = (path) => {
    Image.getSize(path, (width, height) => {
      let resize_width = width / DEVICE_WIDTH * 10;
      let resize_height = height / DEVICE_HEIGHT * 10;
      let max = Math.max(resize_width.toFixed(0), resize_height.toFixed(0));

      this.setState({width: width / max, height: height / max});
    }, (error) => {
      console.log(error);
    });
  }

  shouldComponentUpdate = async (nextProps, nextState) => {
    const {uri} = this.props;

    if (nextProps.uri !== uri || nextState.path !== this.state.path) {
      const name = shorthash.unique(nextProps.uri);
      const extension = (Platform.OS === 'android') ? 'file://' : '';
      const path = `${extension}${RNFS.CachesDirectoryPath}/${name}.png`;

      await RNFS.exists(path).then(exists => {
        if (exists) this.loadFile(path);
        else this.downloadFile(nextProps.uri, path);
      });

      this.setState({path: path});
    }
  };


  onError() {
    this.setState({error: true});
    console.log("CacheImageComponent error: ");
  }

  render() {
    const {error, source, height, width} = this.state;
    const src = {uri: this.props.uri};
    return Platform.OS === 'ios' ? (
      <Image style={{height: height, width: width}}
             source={!error ? source : src}
             onError={(err) => {
               this.onError()
             }}/>
    ) : (
      <Image style={{height: height, width: width}}
             source={source}
             onError={(err) => {
               this.onError()
             }}/>
    )
  }
}

export default CacheImageComponent;
