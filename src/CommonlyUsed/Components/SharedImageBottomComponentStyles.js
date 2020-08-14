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
        height: DEVICE_WIDTH * 0.25 / 3.80962343096,
        width: DEVICE_WIDTH * 0.25
    },
    storeImageStyle: {
        height: DEVICE_WIDTH * 0.25 / 3.80962343096,
        width: DEVICE_WIDTH * 0.25
    },
    turkaiTextStyle: {
        fontSize: 14,
        fontWeight: '500',
        color: 'rgba(37,37,229,0.77)',
    },
    hikdemisTextStyle: {
        fontSize: 18,
        fontWeight: '500',
        color: 'rgba(47,47,49,0.72)',
        marginLeft: 5
    },
    appLogoImageStyle: {
        height: 55,
        width: 55
    },
    appLogoContainerStyles: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 10
    }
});
