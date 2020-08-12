import React, {Component} from 'react';
import {Image, Modal, StyleSheet, TouchableOpacity, View} from "react-native";
import {DEVICE_HEIGHT, DEVICE_WIDTH} from "../../CommonlyUsed/CommonlyUsedConstants";
import DisplaySavedImage from "./DisplayImageComponent/DisplaySavedImage";
import {connect} from "react-redux";

class ImageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false
        }
    }

    DisplayImage = () => {
        this.setState({modalVisible: true});
    };

    render() {
        const {image} = this.props;
        const {modalVisible} = this.state;

        return (
            <View>
                <TouchableOpacity onPress={() => this.DisplayImage()}>
                    <Image source={{uri: image.uri}} style={[styles.imageStyle]}/>
                </TouchableOpacity>

                <Modal animationType="slide" transparent={false} visible={modalVisible}
                       onBackdropPress={() => this.setState({modalVisible: false})}>
                    <DisplaySavedImage image={image} closeModal={() => this.setState({modalVisible: false})}/>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    imageStyle: {
        height: DEVICE_WIDTH * 0.3,
        width: DEVICE_WIDTH * 0.3,

        marginHorizontal: DEVICE_WIDTH * 0.015,
        marginVertical: DEVICE_HEIGHT * 0.0075,

        borderWidth: 1.5,
        borderColor: '#b6b6b6'
    }
});

const mapStateToProps = state => {
    return {
        language: state.mainReducer.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageComponent);
