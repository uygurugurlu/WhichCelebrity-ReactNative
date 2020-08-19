import React, {Component} from 'react';
import {SearchBar} from "react-native-elements";
import {DEVICE_WIDTH} from "../CommonlyUsedConstants";
import {page_body_background_color} from "../ColorIndex";
import {StyleSheet} from "react-native";

class SearchBarComponent extends Component {
    render() {
        const {search, updateSearch} = this.props;

        return (
            <SearchBar
                placeholder="Bir Ünlü Seç ..."
                onChangeText={updateSearch}
                value={search}
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={{color: '#000'}}
                containerStyle={styles.containerStyle}
                round
                lightTheme={true}
                showLoading={false}
            />
        );
    }
}

const styles = StyleSheet.create({
    inputContainerStyle: {
        width: DEVICE_WIDTH * 0.9,
        backgroundColor: page_body_background_color
    },
    containerStyle: {
        backgroundColor: page_body_background_color,
        marginVertical: 5,
        borderColor: page_body_background_color

    },
})

export default SearchBarComponent;
