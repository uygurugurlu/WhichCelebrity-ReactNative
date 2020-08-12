import React, {Component} from 'react';
import Avatar, {Sizes} from "rn-avatar";
import {GENERIC_USER} from "../IconIndex";

class AvatarComponent extends Component {
    render() {
        const {ImageSource, SelectAvatar} = this.props;
        return (
            <Avatar
                rounded
                showEditButton={ImageSource === ''}
                size={Sizes.EXTRA_LARGE}
                source={ImageSource === '' ? GENERIC_USER : ImageSource}
                title='Grace'
                containerStyle={{backgroundColor: '#fff'}}
                onEditPress={() => SelectAvatar()}
                onPress={() => SelectAvatar()}
                overlayContainerStyle={{margin: 5, backgroundColor: 'white'}}
                editButton={{
                    name: 'camera',
                    type: 'entypo',
                    size: 30,
                    style: {margin: 5, backgroundColor: '#f2f2f265'},
                    color: '#576f87'
                }}
            />
        );
    }
}

export default AvatarComponent;
