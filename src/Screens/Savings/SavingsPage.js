import React, {Component} from 'react';
import {styles} from './SavingsPageStyles';
import CameraRoll from "@react-native-community/cameraroll";
import {FlatList, View} from "react-native";
import ImageComponent from './ImageComponent';
import {DEVICE_WIDTH,
    ALBUM_NAME,
} from "../../CommonlyUsed/CommonlyUsedConstants";
import {connect} from "react-redux";
import {translate} from "../../I18n";

class SavingsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            photos: [],
        }
    }

    componentWillMount() {
        this.props.navigation.setOptions({
            headerTitle: translate('app_name')
        });
    }

    getPhotos() {
        const {tab_index} = this.props.route.params;

        let photoOptions = {};
        switch (tab_index) {
            case 0:
                photoOptions = {
                    first: 28,
                    assetType: "Photos",
                    groupName: ALBUM_NAME,
                    groupTypes: "Album"
                };
                break;
        }

        CameraRoll.getPhotos(photoOptions).then((results) => {
            console.log(results);
            this.setState({photos: results.edges})
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
        if (nextProps.savings_page_refresh_trigger !== this.props.savings_page_refresh_trigger) {
            this.getPhotos();
        }
    };

    render() {
        return (
            <View style={styles.mainContainer}>
                <FlatList
                    data={this.state.photos}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    onRefresh={() => this.handleRefresh()}
                    onEndReached={() => this.OnEndReached()}
                    refreshing={this.state.refreshing}
                    onEndReachedThreshold={0.35}
                    renderItem={({item}) => (
                        <ImageComponent image={item.node.image}/>
                    )}
                    keyExtractor={item => item.node.timestamp}
                    style={{flex: 1}}
                    contentContainerStyle={{width: DEVICE_WIDTH * 0.98}}
                />
            </View>
        );
    }

    OnEndReached() {
        return undefined;
    }
}

const mapStateToProps = state => {
    return {
        language: state.mainReducer.language,
        savings_page_refresh_trigger: state.mainReducer.savings_page_refresh_trigger
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(SavingsPage);
