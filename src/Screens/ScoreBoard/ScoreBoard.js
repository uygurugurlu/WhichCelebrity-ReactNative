import React, { Component } from 'react';
import {
  FlatList, ImageBackground, Text, View
} from 'react-native';
import { connect } from 'react-redux';
import { styles } from './ScoreBoardStyles';
import { CAMERAFRAME, IMAGEBACK } from '../../common/Constants'
import SelectCelebrityComponent from '../../common/Components/SelectCelebrityComponent';
import { translate } from '../../I18n';
import { GetScoreBoard } from '../../common/Functions/Endpoints/GetScoreBoard';
import { GetScoreBoardByCelebrity } from '../../common/Functions/Endpoints/GetScoreBoardByCelebrity';
import CelebritySelectedComponent from './CelebritySelectedComponent';
import TopRanksComponent from './TopRanksComponent';
import SwipeableImageModal from '../../common/Components/SwipeableImageModal'
class ScoreBoard extends Component {
  constructor() {
    super();
    this.state = {
      celebrityId: 0,
      topRanksData: [],
      celebrityRanksData: [],
      image_uri: CAMERAFRAME,
      isVisible: false,
    };
  }
  handleModalVisibility = (photo) => {
    this.setState({isVisible: !this.state.isVisible, image_uri: photo});
  };

  setCelebrityId = (id) => {
    this.setState({ celebrityId: id });
  }

  componentDidMount = async () => {
    const { user_agent, auth_token } = this.props;
    const scoreBoardData = await GetScoreBoard(user_agent, auth_token);
    this.setState({ topRanksData: scoreBoardData });
  }

  getScoreBoardByCelebrity = async (id) => {
    const { user_agent, auth_token } = this.props;
    const scoreBoardData = await GetScoreBoardByCelebrity(user_agent, id, auth_token);
    this.setState({ celebrityRanksData: scoreBoardData });
  }
  getTopTen = () => {
    console.log('ok');
    const { user_agent, auth_token } = this.props;
    GetScoreBoard(user_agent, auth_token).then( (res) =>
      this.setState({ topRanksData: res })
    );
  }
  photoClicked = (photo) => {
    console.log("photo: ", photo);
    this.handleModalVisibility(photo);
  }
  render() {
    const { celebrityId, topRanksData, celebrityRanksData } = this.state;

    return (
      <View style={styles.container}>
        <ImageBackground style={styles.imageBack} source={IMAGEBACK}>
          <View style={[styles.selectCelebrityContainer, { flex: celebrityId === 0 ? 0.2 : 0.3 }]}>
            <SelectCelebrityComponent setCelebrityId={this.setCelebrityId} getScoreBoardByCelebrity={this.getScoreBoardByCelebrity} />
          </View>
          <View style={styles.topLabelContainerStyle}>
            <Text style={styles.topLabelStyle}>{celebrityId === 0 ? translate('scoreboard.most_similar') : translate('scoreboard.most_similar_selected')}</Text>
          </View>
          <View style={styles.boardContainer}>
            <View style={styles.topRanksContainer}>
              {this.state.celebrityId === 0 ? (
                <TopRanksComponent data={topRanksData} getApiData={this.getTopTen} photoClicked={this.photoClicked.bind(this)}/>
              ) : (
                <CelebritySelectedComponent data={celebrityRanksData} photoClicked={this.photoClicked.bind(this)}/>
              )}

            </View>
            {/* <View style={styles.myRankContainer}>
              <Text style={styles.topLabelStyle}>Sizin s??ralaman??z</Text>
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
            */}

          </View>

        </ImageBackground>
        <SwipeableImageModal
          uri={this.state.image_uri}
          index={1}
          isVisible={this.state.isVisible}
          handleVisibility={() => this.setState({isVisible: false})}
        />
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  language: state.mainReducer.language,
  user_agent: state.mainReducer.user_agent,
  auth_token: state.mainReducer.auth_token,
});
export default connect(mapStateToProps, null)(ScoreBoard);
