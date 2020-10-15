import React, { Component } from 'react';
import {
  FlatList, ImageBackground, Text, View
} from 'react-native';
import { styles } from './ScoreBoardStyles';
import { IMAGEBACK } from '../../common/Constants';
import ScoreBoardComponent from '../../common/Components/ScoreBoardComponent';

const data = [
  {
    id: 1,
    userName: 'ali veli',
    userPhoto: 'https://cdn.faceplusplus.com/mc-official/images/comparing/left_pic_three.jpg',
    celebrityName: 'Brad Pitt',
    celebrityPhoto: 'https://static3.tribun24.com/servev2/218LDAGsoGCA/XQ4b2qIL11M,/brad-pitt-attends-the-premiere-of-20th-century-foxs.jpg',
    percentage: 81,
  },
  {
    id: 2,
    userName: 'ali veli',
    userPhoto: 'https://cdn.faceplusplus.com/mc-official/images/comparing/left_pic_three.jpg',
    celebrityName: 'Brad Pitt',
    celebrityPhoto: 'https://static3.tribun24.com/servev2/218LDAGsoGCA/XQ4b2qIL11M,/brad-pitt-attends-the-premiere-of-20th-century-foxs.jpg',
    percentage: 81,
  },
  {
    id: 3,
    userName: 'ali veli',
    userPhoto: 'https://cdn.faceplusplus.com/mc-official/images/comparing/left_pic_three.jpg',
    celebrityName: 'Brad Pitt',
    celebrityPhoto: 'https://static3.tribun24.com/servev2/218LDAGsoGCA/XQ4b2qIL11M,/brad-pitt-attends-the-premiere-of-20th-century-foxs.jpg',
    percentage: 81,
  },
  {
    id: 4,
    userName: 'ali veli',
    userPhoto: 'https://cdn.faceplusplus.com/mc-official/images/comparing/left_pic_three.jpg',
    celebrityName: 'Brad Pitt',
    celebrityPhoto: 'https://static3.tribun24.com/servev2/218LDAGsoGCA/XQ4b2qIL11M,/brad-pitt-attends-the-premiere-of-20th-century-foxs.jpg',
    percentage: 81,
  },
  {
    id: 5,
    userName: 'ali veli',
    userPhoto: 'https://cdn.faceplusplus.com/mc-official/images/comparing/left_pic_three.jpg',
    celebrityName: 'Brad Pitt',
    celebrityPhoto: 'https://static3.tribun24.com/servev2/218LDAGsoGCA/XQ4b2qIL11M,/brad-pitt-attends-the-premiere-of-20th-century-foxs.jpg',
    percentage: 81,
  },
];

export default class ScoreBoard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.imageBack} source={IMAGEBACK}>
          <View style={styles.topLabelContainerStyle}>
            <Text style={styles.topLabelStyle}>Sıralama</Text>
          </View>
          <View style={styles.boardContainer}>
            <View style={styles.topRanksContainer}>
              <FlatList
                keyExtractor={(item) => item.id.toString()}
                data={data}
                renderItem={({ item }) => (
                  <ScoreBoardComponent
                    userName={item.userName}
                    userPhoto={item.userPhoto}
                    celebrityName={item.celebrityName}
                    celebrityPhoto={item.celebrityPhoto}
                    percentage={item.percentage}
                  />
                )}
              />
            </View>
            <View style={styles.myRankContainer} />
          </View>

        </ImageBackground>
      </View>
    );
  }
}
