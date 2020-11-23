import React, {Component} from 'react';
import {styles} from './SavingsPageStyles';
import CameraRoll from '@react-native-community/cameraroll';
import {FlatList, Text, View} from 'react-native';
import ImageComponent from './ImageComponent';
import {DEVICE_WIDTH} from '../../common/Constants';
import {connect} from 'react-redux';
import {translate} from '../../I18n';
import Icon from 'react-native-fontawesome-pro';
import {Button} from 'react-native-elements';
import {
  clear_delete_list,
  clear_selected_to_delete_count,
} from '../../Store/Actions';
import SavedImageNotFoundComponent from '../../common/Components/SavedImageNotFoundComponent';

class SavingsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      photos: [],
      delete_mode: false,
    };
  }

  DeleteSelected = () => {
    this.setState({delete_mode: !this.state.delete_mode});
  };

  Delete = () => {
    const {delete_list} = this.props;
    console.log('delete_list: ', delete_list);
    CameraRoll.deletePhotos(delete_list).then((res) => {
      console.log('res: ', res);
      this.ChangeDeleteMode(false);
      this.getPhotos();
    });
    this.props.clear_selected_to_delete_count();
    this.setState({delete_mode: false});
  };

  CancelDelete = () => {
    this.setState({delete_mode: false});
    this.props.clear_selected_to_delete_count();
    this.props.clear_delete_list();
  };

  componentWillMount() {
    this.props.navigation.setOptions({
      headerTitle: translate('app_name'),
      headerRight: () => (
        <Icon
          name={'trash-alt'}
          color={'white'}
          iconStyle={{marginRight: DEVICE_WIDTH * 0.05}}
          size={24}
          type={'regular'}
          onPress={() => this.DeleteSelected()}
        />
      ),
    });
  }

  getPhotos() {
    let photoOptions = {
      first: 28,
      assetType: 'Photos',
      groupName: translate('app_name'),
      groupTypes: 'Album',
    };

    CameraRoll.getPhotos(photoOptions).then((results) => {
      console.log('getPhotos: ', results.edges);
      this.setState({photos: results.edges});
    });
  }

  componentDidMount() {
    this.getPhotos();
  }

  handleRefresh = () => {
    this.setState({refreshing: false});
    this.getPhotos();
  };

  shouldComponentUpdate = async (nextProps, nextState) => {
    const {savings_page_refresh_trigger} = this.props;

    if (
      nextProps.savings_page_refresh_trigger !== savings_page_refresh_trigger
    ) {
      this.getPhotos();
    }
  };

  ChangeDeleteMode = (mode) => {
    this.setState({delete_mode: mode});
  };

  renderHeader = () => {
    if (this.state.photos.length === 0) {
      return <SavedImageNotFoundComponent />;
    } else {
      return <View />;
    }
  };

  render() {
    const {delete_mode} = this.state;
    const {selected_to_delete_count} = this.props;

    return (
      <View style={styles.mainContainer}>
        <FlatList
          data={this.state.photos}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={this.renderHeader}
          onRefresh={() => this.handleRefresh()}
          onEndReached={() => this.OnEndReached()}
          refreshing={this.state.refreshing}
          onEndReachedThreshold={0.35}
          renderItem={({item}) => (
            <ImageComponent
              image={item.node.image}
              deleteMode={delete_mode}
              changeDeleteMode={(mode) => this.ChangeDeleteMode(mode)}
            />
          )}
          keyExtractor={(item) => item.node.timestamp}
          style={{flex: 1}}
          contentContainerStyle={{width: DEVICE_WIDTH * 0.98}}
        />

        <View
          style={styles.buttonsRowStyle}
          display={
            selected_to_delete_count !== 0 && delete_mode ? 'flex' : 'none'
          }>
          <Button
            title={translate('saved.cancel')}
            titleStyle={styles.buttonTitleStyle}
            buttonStyle={styles.buttonStyle}
            color={'#123456'}
            containerStyle={styles.buttonContainerStyle}
            onPress={this.CancelDelete}
          />

          <Button
            title={translate('saved.delete')}
            titleStyle={styles.buttonTitleStyle}
            buttonStyle={styles.buttonStyle}
            color={'#123456'}
            containerStyle={styles.buttonContainerStyle}
            onPress={this.Delete}
          />
        </View>

        <View
          style={styles.buttonsRowStyle}
          display={
            selected_to_delete_count === 0 && delete_mode ? 'flex' : 'none'
          }>
          <Text style={{color: 'white', fontSize: 17, fontWeight: '500'}}>
            {translate('saved.select')}
          </Text>
        </View>
      </View>
    );
  }

  OnEndReached() {
    return undefined;
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.mainReducer.language,
    savings_page_refresh_trigger:
      state.mainReducer.savings_page_refresh_trigger,
    selected_to_delete_count: state.mainReducer.selected_to_delete_count,
    delete_list: state.mainReducer.delete_list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clear_selected_to_delete_count: (bool) =>
      dispatch(clear_selected_to_delete_count(bool)),
    clear_delete_list: () => dispatch(clear_delete_list()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SavingsPage);
