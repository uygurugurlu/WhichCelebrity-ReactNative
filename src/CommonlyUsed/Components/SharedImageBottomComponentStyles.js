import {StyleSheet} from "react-native";
import {DEVICE_HEIGHT, DEVICE_WIDTH} from "../CommonlyUsedConstants";

export const styles = StyleSheet.create({
    turkaiContainerStyle: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: DEVICE_WIDTH * 0.95,
        paddingBottom: 20
    },
    turkaiRowContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: DEVICE_WIDTH * 0.95,
        marginTop: DEVICE_HEIGHT * 0.1
    },
    turkaiLogoStyle: {
        height: DEVICE_WIDTH * 0.4 / 3.80962343096,
        width: DEVICE_WIDTH * 0.4
    },
    storeImageStyle: {
        height: DEVICE_WIDTH * 0.2 / 3.80962343096,
        width: DEVICE_WIDTH * 0.2
    },
    turkaiTextStyle: {
        fontSize: 14,
        fontWeight: '500',
        color: 'rgba(37,37,229,0.77)',
    },
    hikdemisTextStyle: {
        fontSize: 16,
        fontWeight: '500',
        color: 'rgba(47,47,49,0.72)',
        marginLeft: 5
    },
    hikdemisImageStyle: {
        height: 45,
        width: 45
    }
});
