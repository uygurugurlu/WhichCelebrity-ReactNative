import React, { Component } from 'react';
import {
  FlatList, ImageBackground, Text, View
} from 'react-native';
import { styles } from './ScoreBoardStyles';
import { IMAGEBACK } from '../../common/Constants';
import ScoreBoardComponent1 from '../../common/Components/ScoreBoardComponent1';

const data = [
  {
    rank: 1,
    userName: 'ali veli',
    userPhoto: 'https://cdn.faceplusplus.com/mc-official/images/comparing/left_pic_three.jpg',
    celebrityName: 'Morgan freeman',
    celebrityPhoto: 'https://static3.tribun24.com/servev2/218LDAGsoGCA/XQ4b2qIL11M,/brad-pitt-attends-the-premiere-of-20th-century-foxs.jpg',
    percentage: 81,
  },
  {
    rank: 2,
    userName: 'ali veli',
    userPhoto: 'https://cdn.faceplusplus.com/mc-official/images/comparing/left_pic_three.jpg',
    celebrityName: 'Brad Pitt',
    celebrityPhoto: 'https://static3.tribun24.com/servev2/218LDAGsoGCA/XQ4b2qIL11M,/brad-pitt-attends-the-premiere-of-20th-century-foxs.jpg',
    percentage: 76,
  },
  {
    rank: 3,
    userName: 'ali veli',
    userPhoto: 'https://cdn.faceplusplus.com/mc-official/images/comparing/left_pic_three.jpg',
    celebrityName: 'Brad Pitt',
    celebrityPhoto: 'https://static3.tribun24.com/servev2/218LDAGsoGCA/XQ4b2qIL11M,/brad-pitt-attends-the-premiere-of-20th-century-foxs.jpg',
    percentage: 70,
  },
  {
    rank: 4,
    userName: 'ali veli',
    userPhoto: 'https://cdn.faceplusplus.com/mc-official/images/comparing/left_pic_three.jpg',
    celebrityName: 'Brad Pitt',
    celebrityPhoto: 'https://static3.tribun24.com/servev2/218LDAGsoGCA/XQ4b2qIL11M,/brad-pitt-attends-the-premiere-of-20th-century-foxs.jpg',
    percentage: 63,
  },
  {
    rank: 5,
    userName: 'ali veli',
    userPhoto: 'https://cdn.faceplusplus.com/mc-official/images/comparing/left_pic_three.jpg',
    celebrityName: 'Brad Pitt',
    celebrityPhoto: 'https://static3.tribun24.com/servev2/218LDAGsoGCA/XQ4b2qIL11M,/brad-pitt-attends-the-premiere-of-20th-century-foxs.jpg',
    percentage: 51,
  },
];

export default class ScoreBoard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.imageBack} source={IMAGEBACK}>
          <View style={styles.topLabelContainerStyle}>
            <Text style={styles.topLabelStyle}>Ünlülere en çok benzeyen kullanıcılar</Text>
          </View>
          <View style={styles.boardContainer}>
            <View style={styles.topRanksContainer}>
              <FlatList
                keyExtractor={(item) => item.rank.toString()}
                data={data}
                renderItem={({ item }) => (
                  <ScoreBoardComponent1
                    rank={item.rank}
                    userName={item.userName}
                    userPhoto={item.userPhoto}
                    celebrityName={item.celebrityName}
                    celebrityPhoto={item.celebrityPhoto}
                    percentage={item.percentage}
                  />
                )}
              />
            </View>
            <View style={styles.myRankContainer}>
              <Text style={styles.topLabelStyle}>Sizin sıralamanız</Text>
              <View style={styles.myRankWrapper}>
                <ScoreBoardComponent1
                  rank={2000}
                  userName={data[0].userName}
                  userPhoto={data[0].userPhoto}
                  celebrityName={data[0].celebrityName}
                  celebrityPhoto={data[0].celebrityPhoto}
                  percentage={data[0].percentage}
                />
              </View>

            </View>
          </View>

        </ImageBackground>
      </View>
    );
  }
}
