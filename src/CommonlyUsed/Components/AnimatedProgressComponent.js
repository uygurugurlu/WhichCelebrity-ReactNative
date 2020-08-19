import React, {Component} from 'react';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Text, StyleSheet} from "react-native";
import {DEVICE_WIDTH} from "../CommonlyUsedConstants";

const ICON_CONTAINER_SIZE = DEVICE_WIDTH * 0.35;
const CIRCLE_WIDTH = 5;
const DURATION = 2500;

class AnimatedProgressComponent extends Component {
    render() {
        const {fill} = this.props;
        return (
            <AnimatedCircularProgress
                size={ICON_CONTAINER_SIZE / 1.5}
                width={CIRCLE_WIDTH}
                fill={fill}
                duration={DURATION}
                tintColor="red"
                style={styles.iconWrapperStyle}
                backgroundColor="#dddddd">
                {
                    (fill) => (
                        <Text style={styles.percentageTextStyle}>% {Math.ceil(fill)}</Text>
                    )
                }
            </AnimatedCircularProgress>
        );
    }
}

const styles = StyleSheet.create({
    iconWrapperStyle: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    percentageTextStyle: {
        fontSize: 20,
        fontWeight: '500',
    },
})
export default AnimatedProgressComponent;
