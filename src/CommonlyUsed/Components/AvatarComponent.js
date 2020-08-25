import React, {Component} from 'react';
import Avatar, {Sizes} from 'rn-avatar';
import {GENERIC_USER} from '../IconIndex';
import {DEVICE_WIDTH, shadow} from '../Constants';

class AvatarComponent extends Component {
  render() {
    const {ImageSource, SelectAvatar} = this.props;
    return (
      <Avatar
        rounded
        showEditButton={ImageSource === ''}
        size={DEVICE_WIDTH / 2}
        source={ImageSource === '' ? GENERIC_USER : ImageSource}
        title="Grace"
        containerStyle={[{backgroundColor: '#fff'}, shadow]}
        onEditPress={() => SelectAvatar()}
        onPress={() => SelectAvatar()}
        overlayContainerStyle={{margin: 5, backgroundColor: 'white'}}
        editButton={{
          name: 'camera',
          type: 'entypo',
          size: 45,
          style: {margin: 5, backgroundColor: '#f2f2f265'},
          color: '#576f87',
        }}
      />
    );
  }
}

export default AvatarComponent;
