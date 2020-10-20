import React, { Component } from 'react';
import {
  View, StyleSheet, Text, Image
} from 'react-native';
import { CAMERAICON, DEVICE_HEIGHT, DEVICE_WIDTH } from '../Constants';
import { translate } from '../../I18n';
import { blue_text_color } from '../ColorIndex';
import { PercentageColor } from '../Functions/PercentageColor';

class ScoreBoardComponent2 extends Component {
  render() {
    const {
      rank, userName, userPhoto, celebrityName, celebrityPhoto, percentage
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.rankingContainer}>
          <Text style={styles.rankStyle}>{`${rank}.`}</Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.infoContainer}>
            <View style={styles.userContainer}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatarWrapper}>
                  <Image
                    source={{ uri: userPhoto }}
                    style={styles.avatarImage}
                  />
                </View>
              </View>
              <View style={styles.userNameContainer}>
                <Text style={styles.userName}>{userName}</Text>
              </View>
            </View>
            <View style={styles.userContainer}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatarWrapper}>
                  <Image
                    source={{ uri: celebrityPhoto }}
                    style={styles.avatarImage}
                  />
                </View>
              </View>
              <Text style={styles.userName}>{celebrityName}</Text>

            </View>
          </View>
          <View style={styles.percentageContainer}>
            <Text style={[styles.percentageText, { color: PercentageColor(percentage) }]}>{`${percentage}%`}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: DEVICE_HEIGHT * 0.18,
    flexDirection: 'row',
    borderRadius: 10,
    marginVertical: 5,
    overflow: 'hidden',
  },
  rankingContainer: {
    backgroundColor: '#184e83',

    flex: 0.13,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 3,
    borderColor: 'rgba(52,52,52,0)',
    marginRight: 2,
  },
  rankStyle: {
    color: '#fff',
    fontSize: 25,
  },
  contentContainer: {
    backgroundColor: '#184e83',

    flex: 1,
    flexDirection: 'column'
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  userContainer: {
    flex: 0.5,
    justifyContent: 'space-evenly',
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  avatarWrapper: {
    flex: 0.4,
    borderRadius: 100,
    aspectRatio: 1,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',

  },
  avatarImage: {
    resizeMode: 'cover',
    height: DEVICE_WIDTH * 0.18,
    width: DEVICE_WIDTH * 0.18,
  },
  userNameContainer: {
    flex: 0.3,
  },
  userName: {
    color: '#fff',
    fontSize: 13,
    textAlign: 'center',
    marginHorizontal: 20,
    fontWeight: '600'
  },
  percentageContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    top: 0,
    alignSelf: 'center',
  },
  percentageText: {
    color: blue_text_color,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 8,
  },
});

export default ScoreBoardComponent2;
