import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, SafeAreaView, Alert} from "react-native";
import {connect} from "react-redux";
import {translate} from "../../I18n";
import {Button} from "react-native-elements";
import {ActionSheetCustom as ActionSheet} from 'react-native-custom-actionsheet'
import {styles} from "./HomePageStyles";
import axios from "axios";
import DropdownAlert from 'react-native-dropdownalert';
import {InterstitialAd, AdEventType, TestIds} from '@react-native-firebase/admob';
import {get_user_avatar_source} from "../../Store/Actions";
import {GetUserPhotoFromImageLibrary} from "../../CommonlyUsed/Functions/GetUserPhotoFromImageLibrary";
import {GetUserPhotoFromCamera} from "../../CommonlyUsed/Functions/GetUserPhotoFromCamera";
import {ResponseHandler} from "../../CommonlyUsed/CommunlyUsedFunctions";
import {RIGHT_HEADER_ICON, CAMERA_ICON, PICTURE_ICON} from "../../CommonlyUsed/IconIndex";

const ICON_SIZE = 33;
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-9113500705436853/7410126783';
const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: false,
});
import AvatarComponent from "../../CommonlyUsed/Components/AvatarComponent";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: '',
            loaded: false,
            setLoaded: false,
            result_loading: false
        }
    }

    componentWillMount() {
        this.props.navigation.setOptions({
            title: translate("app_name"),
            headerRight: () => (
                <TouchableOpacity onPress={() => this.props.navigation.navigate('SavingsPage', {tab_index: 0})}>
                    <Image source={RIGHT_HEADER_ICON} style={{height: 35, width: 35, marginRight: 15}}/>
                </TouchableOpacity>
            ),
        });
    }

    componentDidMount() {
        interstitial.onAdEvent(type => {
            if (type === AdEventType.LOADED) {
                this.setState({loaded: true});
            }
        });

        // Start loading the interstitial straight away
        interstitial.load();
    }

    showActionSheet = () => this.actionSheet.show()

    getActionSheetRef = ref => (this.actionSheet = ref)

    handlePress = (index) => this.setState({selected: index})

    shouldComponentUpdate = async (nextProps, nextState) => {
        const {userAvatarSource, language} = this.props;
        if (nextProps.language.languageTag !== language.languageTag) {
            await this.WhenTheLanguageChanged();
        }

        if (userAvatarSource !== nextProps.userAvatarSource) {
            interstitial.load();
            this.actionSheet.hide();
        }
    };

    WhenTheLanguageChanged = () => {
        this.forceUpdate();
    }

    LaunchCamera = async () => {
        await GetUserPhotoFromCamera(this.props.get_user_avatar_source);
    }

    LaunchImageLibrary = async () => {
        await GetUserPhotoFromImageLibrary(this.props.get_user_avatar_source);
    }

    GetActionSheet = () => {
        return (
            <ActionSheet
                ref={this.getActionSheetRef}
                title={translate("image_picker.title")}
                options={
                    [
                        translate("image_picker.cancel"),
                        {
                            component: <TouchableOpacity style={styles.line_container_style}
                                                         onPress={() => this.LaunchImageLibrary()}>
                                <Text style={styles.modal_text_style}>{translate("image_picker.photo_library")}</Text>
                                <Image source={PICTURE_ICON} style={{height: ICON_SIZE, width: ICON_SIZE}}/>
                            </TouchableOpacity>,
                            height: 65,
                        },
                        {
                            component: <TouchableOpacity style={styles.line_container_style}
                                                         onPress={() => this.LaunchCamera()}>
                                <Text style={styles.modal_text_style}>{translate("image_picker.use_camera")}</Text>
                                <Image source={CAMERA_ICON} style={{height: ICON_SIZE, width: ICON_SIZE}}/>
                            </TouchableOpacity>,
                            height: 65,
                        }
                    ]
                }
                cancelButtonIndex={0}
                onPress={this.handlePress}
            />
        );
    }

    CheckValidity = () => {
        const {userAvatarSource} = this.props;

        if (userAvatarSource === '') {
            Alert.alert("", translate("mono_compare.validity_alert"));
            return false;
        }

        return true;
    }

    GetResult = async () => {
        const {userAvatarB64} = this.props;

        if (this.CheckValidity()) {
            this.setState({result_loading: true});
            interstitial.onAdEvent(type => {
                if (type !== AdEventType.LOADED) {
                    interstitial.load();
                }
            });

            await axios({
                method: 'post',
                url: `https://myface.io/compare`,
                data: {
                    "query": userAvatarB64,
                    "source": [
                        userAvatarB64,
                        userAvatarB64
                    ]
                },
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => {
                    console.log('GetResult Api doğru çalıştı ...', res);

                    try {
                        if (res.data.status === 'ERROR') {
                            this.dropDownAlertRef.alertWithType('warn', 'Upps', res.data.description);
                            this.setState({result_loading: false});
                        } else {
                            interstitial.show();

                            this.props.navigation.navigate("ResultPage");

                            this.setState({result_loading: false});
                            // ResponseHandler(res);
                        }
                    } catch (e) {
                        console.log("error on response: ", e);
                    }
                })
                .catch((error) => {
                    ResponseHandler(error.response);
                    this.dropDownAlertRef.alertWithType('warn', 'Upps', error.response.message);
                    console.group('GetResult Api Api Hatası ...');
                    console.table({...error.response.data});
                    console.groupEnd();
                });
        }
    }

    SelectAvatar = () => {
        this.showActionSheet();
    }

    render() {
        const {userAvatarSource} = this.props;

        return (
            <View style={styles.backgroundImageStyle}>
                <SafeAreaView style={styles.mainContainer}>
                    <View style={styles.labelsContainerStyle}>
                        <View display={'flex'} style={styles.topLabel2ContainerStyle}>
                            <Text style={styles.topLabel2Style}>{translate("famous_compare.compare_header")}</Text>
                        </View>
                    </View>

                    <View style={styles.iconsMainContainerStyle}>
                        <AvatarComponent ImageSource={userAvatarSource}
                                         SelectAvatar={() => this.SelectAvatar()}/>
                    </View>

                    <Button
                        title={translate("home.get_result")}
                        buttonStyle={styles.resultButtonStyle}
                        titleStyle={{fontSize: 18, fontWeight: '600'}}
                        onPress={() => this.GetResult()}
                        loading={this.state.result_loading}
                    />
                    {this.GetActionSheet()}
                </SafeAreaView>

                <DropdownAlert ref={ref => this.dropDownAlertRef = ref} warnColor={'#EE9E44'}/>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.mainReducer.language,
        userAvatarSource: state.mainReducer.userAvatarSource,
        userAvatarB64: state.mainReducer.userAvatarB64,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        get_user_avatar_source: (source, base64_data) => dispatch(get_user_avatar_source(source, base64_data)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
