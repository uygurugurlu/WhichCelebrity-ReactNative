import {DEVICE_HEIGHT, DEVICE_WIDTH} from "../../CommonlyUsed/CommonlyUsedConstants";
import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    topContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: DEVICE_WIDTH * 0.8,
        height: DEVICE_HEIGHT * 0.4,
        marginVertical: DEVICE_HEIGHT * 0.05,
        marginHorizontal: DEVICE_WIDTH * 0.05,
        backgroundColor: 'pink'
    },
    bottomContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: DEVICE_WIDTH * 0.8,
        height: DEVICE_HEIGHT * 0.4,
        marginVertical: DEVICE_HEIGHT * 0.05,
        backgroundColor: 'pink',
    },
    textStyle: {
        fontSize: 24,
        fontWeight: '400',
        marginHorizontal: DEVICE_WIDTH * 0.05,
        textAlign: 'center'
    }
});
