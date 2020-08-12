import {StyleSheet} from "react-native";
import {DEVICE_WIDTH} from "../../CommonlyUsed/CommonlyUsedConstants";

export const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: DEVICE_WIDTH,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        paddingTop: 7.5,
        paddingRight: DEVICE_WIDTH * 0.015
    },
});
