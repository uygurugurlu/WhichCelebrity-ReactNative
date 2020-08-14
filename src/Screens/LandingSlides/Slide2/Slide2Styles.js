import {StyleSheet} from "react-native";
import {DEVICE_HEIGHT, DEVICE_WIDTH} from "../../../CommonlyUsed/CommonlyUsedConstants";

const MOTHER_ICON_SIZE = DEVICE_WIDTH * 0.275;
const FATHER_ICON_SIZE = DEVICE_WIDTH * 0.275;
export const styles = StyleSheet.create({
    mainContainerStyle: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: DEVICE_HEIGHT,
        width: DEVICE_WIDTH,
        marginTop: DEVICE_HEIGHT * 0.15,
        backgroundColor: '#fff',
    },
    containerStyle: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: DEVICE_HEIGHT * 0.58,
        width: DEVICE_WIDTH,
        backgroundColor: '#fff',
    },
    titleRowContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: DEVICE_WIDTH * 0.9,
        backgroundColor: '#fff',
        marginVertical: 15,
    },
    rowContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: DEVICE_WIDTH * 0.85,
        backgroundColor: '#fff',
        marginVertical: 15,
        marginHorizontal: DEVICE_WIDTH * 0.05
    },
    kvkkRowContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        //marginVertical: 5,
    },
    kvkkColumnContainerStyle: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        //alignItems: 'center',
        width: DEVICE_WIDTH * 0.7,
        backgroundColor: '#fff',
        marginVertical: 15,
        marginLeft: DEVICE_WIDTH * 0.1
    },
    kvkkTextStyle: {
        fontSize: 15,
        fontWeight: '400',
        color: 'rgba(0,0,0,0.85)',
    },
    bottomContainerStyle: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    imageStyle: {
        height: DEVICE_WIDTH * 0.4,
        width: DEVICE_WIDTH * 0.6 * 1.47990543735,
        marginVertical: DEVICE_HEIGHT * 0.025
    },
    dotImageStyle: {
        height: 20,
        width: 20,
        marginRight: 10,
        marginTop: 5,
    },
    checkBoxImageStyle: {
        height: 20,
        width: 20,
        marginTop: 5,
    },
    titleTextStyle: {
        fontSize: 20,
        fontWeight: '600',
    },
    textStyle: {
        fontSize: 20,
        fontWeight: '500',
        color: 'rgba(0,0,0,0.7)',
        marginRight: DEVICE_WIDTH * 0.05
    },
    linkTextStyle: {
        fontSize: 16,
        fontWeight: '500',
        color: 'rgba(5,76,147,0.87)',
    },
    getPermissionButtonStyle: {
        width: DEVICE_WIDTH * 0.92,
        borderRadius: 10,
        height: 50,
        backgroundColor: '#0177C9',
        marginBottom: 15,
    },
    getPermissionButtonTittleStyle: {
        fontSize: 18,
        fontWeight: '600',
    },
    laterTextStyle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#0177C9',
    },
    iconsRowContainerStyle: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
        marginBottom: DEVICE_HEIGHT * 0.075,
        marginTop: DEVICE_HEIGHT * 0.025
    },
    iconStyle: {
        width: MOTHER_ICON_SIZE,
        height: MOTHER_ICON_SIZE,
    },
    celebrityIconStyle: {
        width: MOTHER_ICON_SIZE * 0.9 * 1.33888888889,
        height: MOTHER_ICON_SIZE * 0.9,
    },
    compareIconStyle: {
        width: 40,
        height: 40,
    },
    firstIconStyle: {
        width: MOTHER_ICON_SIZE,
        height: MOTHER_ICON_SIZE,
        borderRadius: MOTHER_ICON_SIZE / 2
    },
    secondIconStyle: {
        width: FATHER_ICON_SIZE,
        height: FATHER_ICON_SIZE,
        borderRadius: FATHER_ICON_SIZE / 2
    },
    iconWrapperStyle: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginHorizontal: 25
    },
    compareIconWrapperStyle: {}
});
