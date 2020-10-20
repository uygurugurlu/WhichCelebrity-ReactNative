import React, { Component } from 'react';
import {
  View, StyleSheet, Text, Image
} from 'react-native';
import { CAMERAICON, DEVICE_HEIGHT, DEVICE_WIDTH } from '../Constants';
import { translate } from '../../I18n';
import { blue_text_color } from '../ColorIndex';
import { PercentageColor } from '../Functions/PercentageColor';

class ScoreBoardComponent1 extends Component {
  render() {
    const {
      rank, userName, userPhoto, percentage
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.rankingContainer}>
          <Text style={styles.rankStyle}>{`${rank}.`}</Text>
        </View>
        <View style={styles.photosContainer}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarWrapper}>
              <Image
                source={{ uri: userPhoto }}
                style={styles.avatarImage}
              />
            </View>
          </View>
        </View>

        <View style={styles.namesContainer}>
          <View style={styles.userNameContainer}>
            <Text style={styles.userNameLabel}>{translate('scoreboard.username')}</Text>
          </View>
          <View style={styles.userNameContainer}>
            <Text style={styles.userName}>{userName}</Text>
          </View>
        </View>
        <View style={styles.percentageContainer}>
          <Text style={[styles.percentageText, { color: PercentageColor(percentage) }]}>{`${percentage}%`}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: DEVICE_HEIGHT * 0.108,
    flexDirection: 'row',
    backgroundColor: '#184e83',
    borderRadius: 30,
    marginVertical: 5,
  },
  rankingContainer: {
    flex: 0.13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankStyle: {
    color: '#fff',
    fontSize: 17,
  },
  photosContainer: {
    flex: 0.2,
    flexDirection: 'row',
  },
  avatarContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  avatarContainer2: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  avatarWrapper: {
    flex: 0.9,
    borderRadius: 100,
    aspectRatio: 1,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',

  },
  avatarImage: {
    resizeMode: 'cover',
    height: DEVICE_WIDTH * 0.2,
    width: DEVICE_WIDTH * 0.2,
  },
  namesContainer: {
    flex: 0.4,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  userNameContainer: {
    flex: 0.3,
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  userNameLabel: {
    color: '#c8bf3f',
    fontSize: 15,
    textAlign: 'left',
  },
  userName: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'left',
  },
  percentageContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageText: {
    color: blue_text_color,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ScoreBoardComponent1;
