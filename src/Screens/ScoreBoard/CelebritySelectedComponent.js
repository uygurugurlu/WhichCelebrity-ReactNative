import React, { Component } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import ScoreBoardComponent1 from '../../common/Components/ScoreBoardComponent1';
import { translate } from '../../I18n';
import { shortenUserName } from '../../common/Functions/shortenUserName'

export default class CelebritySelectedComponent extends Component {
  render() {
    const { data } = this.props;
    try {
      if (data.data.similar_users.length > 0) {
        return (
          <FlatList
            keyExtractor={(item) => data.data.similar_users.indexOf(item).toString()}
            data={data.data.similar_users}
            renderItem={({ item }) => (
              <ScoreBoardComponent1
                rank={data.data.similar_users.indexOf(item) + 1}
                userName={shortenUserName(item.name)}
                userPhoto={item.user_photo.url}
                celebrityName={item.celebrityName}
                celebrityPhoto={item.celebrityPhoto}
                percentage={item.similarity}
              />
            )}
          />

        );
      }

      return (
        <Text style={styles.notFoundText}>{translate('scoreboard.user_not_found')}</Text>
      );
    } catch (e) {
      console.log(e);
      return (
        <Text style={styles.notFoundText}>{translate('scoreboard.user_not_found')}</Text>
      );
    }
  }
}
const styles = StyleSheet.create({
  notFoundText: {
    textAlign: 'center',
    marginVertical: 30,
    fontSize: 15,
    color: 'rgb(200,200,200)'
  },
});
