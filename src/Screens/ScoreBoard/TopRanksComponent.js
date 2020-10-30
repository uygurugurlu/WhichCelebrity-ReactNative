import React, { Component } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { translate } from '../../I18n';
import ScoreBoardComponent2 from '../../common/Components/ScoreBoardComponent2';
import { shortenUserName } from '../../common/Functions/shortenUserName'

export default class TopRanksComponent extends Component {
  state = {
    isFetching: false,
  }
  onRefresh  = async () => {
    this.setState({ isFetching: false });
    this.props.getApiData();
  }

  render() {
    const { data } = this.props;
    try {
      console.log('data: ', data);
      if (data.data.length > 0) {
        return (
          <FlatList
            keyExtractor={(item) => data.data.indexOf(item).toString()}
            data={data.data}
            refreshing={this.state.isFetching}
            onRefresh={this.onRefresh}
            renderItem={({ item }) => (
              <ScoreBoardComponent2
                rank={data.data.indexOf(item) + 1}
                userName={shortenUserName(item.user.name)}
                userPhoto={item.user_photo.url}
                celebrityName={item.celebrity.name}
                celebrityPhoto={item.celebrity.photo}
                percentage={item.similartiy}
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
