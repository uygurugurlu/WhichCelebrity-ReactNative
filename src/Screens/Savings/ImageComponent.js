import React, {Component} from 'react';
import {
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
} from '../../CommonlyUsed/Constants';
import DisplaySavedImage from './DisplayImageComponent/DisplaySavedImage';
import {connect} from 'react-redux';
import {CHECKMARK} from '../../CommonlyUsed/IconIndex';
import {
  add_to_delete_list,
  change_selected_to_delete_count,
  remove_from_delete_list,
} from '../../Store/Actions';

class ImageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      will_be_deleted: false,
    };
  }

  DisplayImage = (deleteMode) => {
    const {will_be_deleted} = this.state;
    const {image} = this.props;

    if (deleteMode) {
      this.props.change_selected_to_delete_count(!will_be_deleted);

      if (!will_be_deleted) {
        this.props.add_to_delete_list(image.uri);
        this.setState({will_be_deleted: true});
        this.props.change_selected_to_delete_count(true);
      } else {
        this.props.remove_from_delete_list(image.uri);
        this.setState({will_be_deleted: false});
        this.props.change_selected_to_delete_count(false);
      }
    } else {
      this.setState({modalVisible: true});
    }
  };

  shouldComponentUpdate = async (nextProps, nextState) => {
    const {language} = this.props;
    if (nextProps.language.languageTag !== language.languageTag) {
      await this.WhenTheLanguageChanged();
    }

    if (nextProps.deleteMode === false) {
      this.setState({will_be_deleted: false});
    }
  };

  handlerLongClick = () => {
    console.log('Long Pressed.');
    const {changeDeleteMode, image} = this.props;

    changeDeleteMode(true);
    this.setState({will_be_deleted: true});
    this.props.add_to_delete_list(image.uri);
    this.props.change_selected_to_delete_count(true);
  };

  render() {
    const {image, deleteMode} = this.props;
    const {modalVisible, will_be_deleted} = this.state;

    const style = will_be_deleted ? [styles.imageStyle] : [styles.imageStyle];
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.DisplayImage(deleteMode)}
          onLongPress={() => this.handlerLongClick()}>
          <ImageBackground source={{uri: image.uri}} style={style}>
            <View
              display={deleteMode && will_be_deleted ? 'flex' : 'none'}
              style={styles.deleteStyle}>
              <View display={deleteMode && will_be_deleted ? 'flex' : 'none'}>
                <Image source={CHECKMARK} style={styles.checkStyle} />
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onBackdropPress={() => this.setState({modalVisible: false})}>
          <DisplaySavedImage
            image={image}
            closeModal={() => this.setState({modalVisible: false})}
          />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageStyle: {
    height: DEVICE_WIDTH * (DEVICE_HEIGHT / DEVICE_WIDTH) * 0.3,
    width: DEVICE_WIDTH * 0.3,

    marginHorizontal: DEVICE_WIDTH * 0.015,
    marginVertical: DEVICE_HEIGHT * 0.0075,

    borderWidth: 1.5,
    borderColor: '#b6b6b6',
  },
  deleteStyle: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',

    height: DEVICE_WIDTH * (DEVICE_HEIGHT / DEVICE_WIDTH) * 0.3,
    width: DEVICE_WIDTH * 0.3,

    borderWidth: 1.5,
    borderColor: '#b6b6b6',
    backgroundColor: 'gray',
    opacity: 0.8,
  },
  checkStyle: {
    height: 50,
    width: 50,
    marginBottom: (DEVICE_WIDTH * (DEVICE_HEIGHT / DEVICE_WIDTH) * 0.3) / 2.5,
  },
});

const mapStateToProps = (state) => {
  return {
    language: state.mainReducer.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    change_selected_to_delete_count: (bool) =>
      dispatch(change_selected_to_delete_count(bool)),
    add_to_delete_list: (uri) => dispatch(add_to_delete_list(uri)),
    remove_from_delete_list: (uri) => dispatch(remove_from_delete_list(uri)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageComponent);
