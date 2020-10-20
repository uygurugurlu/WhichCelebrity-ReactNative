import React, { Component } from 'react';
import {
  Dimensions,
  FlatList,
  Image, ImageBackground, Modal,
  StyleSheet, Text, TouchableHighlight, TouchableOpacity,
  View,
} from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import { translate } from '../../I18n';
import { blue_text_color } from '../ColorIndex';
import { DEVICE_WIDTH } from '../Constants';
import { GetCelebrities } from '../Functions/Endpoints/GetCelebrities';
import { get_detected_face_count, get_user_avatar_source } from '../../Store/Actions';
import { GetCelebrity } from '../Functions/Endpoints/GetCelebrity';
import { SearchCelebrities } from '../Functions/Endpoints/SearchCelebrities';

class SelectCelebrityComponent extends Component {
  constructor() {
    super();
    this.state = {
      isCelebritySelected: false,
      celebritiesVisibility: false,
      celebrityName: '',
      celebrityPhoto: '',
      search: '',
      celebrityId: '',
      scroll_items: '',
    };
  }

  componentDidMount() {
    this.getInitialCelebrities();
  }

  WhenTheLanguageChanged = () => this.forceUpdate();

  shouldComponentUpdate = async (nextProps, nextState) => {
    const { userAvatarSource, language } = this.props;
    const { search } = this.state;

    if (nextProps.language.languageTag !== language.languageTag) {
      await this.WhenTheLanguageChanged();
    }

    if (search !== nextState.search) {
      await this.fillScroll(nextState.search);
    }
  };

  fillScroll = async (search) => {
    if (search.length > 1) {
      SearchCelebrities(this.props.user_agent, search, this.props.auth_token).then((res) => {
        console.log('Celebrities after search: ', res.data);

        this.setState({ scroll_items: res.data });
      });
    } else {
      this.getInitialCelebrities();
    }
  };

  updateSearch = (search) => this.setState({ search });

  CelebritySelected = (celebrity) => {
    const { user_agent, setCelebrityId, getScoreBoardByCelebrity } = this.props;
    setCelebrityId(celebrity.id);
    this.setState({
      search: celebrity.name,
      celebrityName: celebrity.name,
      celebrityId: celebrity.id,
      celebrityPhoto: celebrity.photo,
    });
    GetCelebrity(user_agent, celebrity.id, this.props.auth_token).then((res) => {
      console.log('GetCelebrity res: ', res);
      this.setState({ celebrityPhoto: res.data.photo });
      getScoreBoardByCelebrity(celebrity.id);
    });
  };

  getInitialCelebrities = () => {
    GetCelebrities(this.props.user_agent, this.props.auth_token).then((res) => {
      console.log('Initial Celebritiesss : ', res.data);
      this.setState({ scroll_items: res.data });
    });
  };

  cancelCelebrity = () => {
    this.props.setCelebrityId(0);
    this.setState({
      isCelebritySelected: false,
      celebrityName: '',
      celebrityId: '',
      celebrityPhoto: '',
      search: '',
    });
    this.getInitialCelebrities();
  };

  render() {
    return (
      <View style={styles.container}>
        {!this.state.isCelebritySelected ? (
          <TouchableHighlight
            style={styles.selectCategoryContainer}
            onPress={() => this.setState({ celebritiesVisibility: true })}
          >
            <View style={styles.selectCategoryWrapper}>
              <Text style={styles.selectCategoryText}>
                {this.state.celebrityName === ''
                  ? translate('home.select_celebrity')
                  : this.state.celebrityName}
              </Text>
              <Icon
                name="keyboard-arrow-right"
                color="#284077"
              />
            </View>
          </TouchableHighlight>
        ) : (
          <View style={styles.celebritySelectedContainer}>
            <TouchableHighlight
              style={styles.celebritySelectedPressContainer}
              onPress={() => this.setState({ celebritiesVisibility: true })}
            >
              <View style={styles.celebritySelectedPress}>
                <Text style={styles.selectCategoryText}>
                  {this.state.celebrityName === ''
                    ? translate('home.select_celebrity')
                    : translate('home.select_another_celebrity')}
                </Text>
                <Icon
                  name="keyboard-arrow-down"
                  color="#284077"
                  style={styles.selectCategoryIcon}
                />
              </View>
            </TouchableHighlight>
            <View style={styles.celebritySelectedRow}>
              <View
                style={styles.celebritySelectedImageContainer}

              >
                <View style={styles.celebritySelectedImageWrapper}>
                  <Image
                    source={{ uri: this.state.celebrityPhoto }}
                    style={styles.celebritySelectedImage}
                  />
                </View>
              </View>
              <View style={styles.celebritySelectedName}>
                <Text style={styles.celebritySelectedNameText}>
                  {this.state.celebrityName}
                </Text>
              </View>
              <View style={styles.selectedCelebrityCancel}>
                <TouchableOpacity onPress={() => this.cancelCelebrity()}>
                  <Icon name="cancel" color={blue_text_color} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        {
        // Celebrities Modal
        }
        <Modal
          visible={this.state.celebritiesVisibility}
          transparent
          animationType="slide"
        >
          <TouchableOpacity
            style={styles.modalBack}
            onPress={() => this.setState({ celebritiesVisibility: false })}
          />
          <View style={styles.bottomModal}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <View style={styles.headerContainer}>
                  <Text style={styles.modalHeaderTitle}>
                    {translate('home.select_celebrity')}
                  </Text>
                  <TouchableOpacity
                    style={styles.ModalCloseButton}
                    onPress={() => this.setState({ celebritiesVisibility: false })}
                  >
                    <Icon name="close" color="#517fa4" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.categoryListContainer}>
                <SearchBar
                  onChangeText={(e) => this.updateSearch(e)}
                  value={this.state.search}
                  placeholder={translate('home.search_celebrity')}
                  lightTheme
                  round
                />
                <FlatList
                  style={{ marginTop: 7 }}
                  keyboardShouldPersistTaps="handled"
                  data={this.state.scroll_items}
                  keyExtractor={(celeb) => celeb.id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={{
                        backgroundColor:
                          this.state.celebrityId === item.id
                            ? '#4598e6'
                            : '#fff',
                      }}
                      onPress={() => {
                        this.CelebritySelected(item);
                        this.setState({
                          celebritiesVisibility: false,
                          isCelebritySelected: true,
                        });
                      }}
                    >
                      <View
                        style={{
                          borderBottomWidth: 0.5,
                          borderColor: 'rgb(150,150,150)',
                          paddingBottom: 7,
                          marginBottom: 7,
                        }}
                      >
                        <View style={styles.modalItemContainer}>
                          <View style={styles.modalImageContainer}>
                            <Image
                              source={{ uri: item.photo }}
                              style={styles.modalImage}
                            />
                          </View>
                          <Text style={styles.categoriesListText}>
                            {item.name}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          </View>
        </Modal>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
  selectCategoryContainer: {
    height: 40,
    justifyContent: 'center',
    width: DEVICE_WIDTH - 60,
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: 'rgb(240,240,240)',
  },
  selectCategoryWrapper: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectCategoryText: {
    flexDirection: 'row',
    flex: 0.8,
    color: '#284077',
    textAlign: 'center',
    fontWeight: '700',
  },
  celebritySelectedContainer: {
    height: 100,
    justifyContent: 'center',
    width: DEVICE_WIDTH - 60,
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: 'rgb(240,240,240)',
  },
  celebritySelectedPressContainer: {
    height: 40,
    width: DEVICE_WIDTH - 60,
    alignSelf: 'center',
  },
  celebritySelectedPress: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(180,180,180)',
  },
  celebritySelectedRow: {
    flexDirection: 'row',
    height: 60,
  },
  celebritySelectedImageContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  celebritySelectedImageWrapper: {
    margin: 3,
    flex: 1,
    overflow: 'hidden',
    aspectRatio: 1,
    borderRadius: 100,
  },
  celebritySelectedImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  celebritySelectedName: {
    flex: 0.5,
    justifyContent: 'center',
  },
  celebritySelectedNameText: {
    color: '#284077',
    fontWeight: '700',
  },
  selectedCelebrityCancel: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // celebrities style
  modalBack: {
    backgroundColor: '#00000080',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomModal: {
    justifyContent: 'flex-end',
    flex: 1,
  },

  modalContainer: {
    backgroundColor: 'rgb(245,245,245)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeader: {
    height: 55,
    backgroundColor: '#284077',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    flex: 10,
    justifyContent: 'center',
  },
  modalHeaderTitle: {
    flex: 8,
    color: 'white',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingLeft: 40,
    textAlign: 'center',
  },
  ModalCloseButton: {
    alignSelf: 'center',
    paddingHorizontal: 10,
  },
  modalItem: {
    borderBottomWidth: 0.5,
    borderColor: 'rgb(150,150,150)',
  },
  categoryListContainer: {
    height: Math.round(Dimensions.get('window').height) * 0.5,
    marginBottom: 30,
  },
  categoriesListText: {
    textAlign: 'center',
    marginHorizontal: 10,
  },
  modalItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalImageContainer: {
    height: 50,
    width: 50,
    borderRadius: 100,
    overflow: 'hidden',
    marginLeft: 10,
  },
  modalImage: {
    height: 50,
    width: 50,
  },
});

const mapStateToProps = (state) => ({
  language: state.mainReducer.language,
  auth_token: state.mainReducer.auth_token
});

const mapDispatchToProps = (dispatch) => ({
  get_user_avatar_source: (source, base64_data) => dispatch(get_user_avatar_source(source, base64_data)),
  get_detected_face_count: (count) => dispatch(get_detected_face_count(count)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SelectCelebrityComponent);
