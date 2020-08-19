import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {translate} from '../../I18n';
import {Button} from 'react-native-elements';
import {styles} from './HomePage2Styles';
import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from '@react-native-firebase/admob';
import {get_user_avatar_source} from '../../Store/Actions';
import {GetUserPhotoFromImageLibrary} from '../../CommonlyUsed/Functions/GetUserPhotoFromImageLibrary';
import {GetUserPhotoFromCamera} from '../../CommonlyUsed/Functions/GetUserPhotoFromCamera';
import {RIGHT_HEADER_ICON} from '../../CommonlyUsed/IconIndex';
import AvatarComponent from '../../CommonlyUsed/Components/AvatarComponent';
import {GetResult} from '../../CommonlyUsed/Functions/GetResult';
import ActionSheetComponent from '../../CommonlyUsed/Components/ActionSheetComponent';
import SearchBarComponent from '../../CommonlyUsed/Components/SearchBarComponent';
import {DEVICE_HEIGHT} from '../../CommonlyUsed/CommonlyUsedConstants';

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-9113500705436853/7410126783';
const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: false,
});

class HomePage2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
      loaded: false,
      setLoaded: false,
      result_loading: false,
      search: '',
      celebrities: [
        'İbrahim',
        'Ömer',
        'Ahmet',
        'Çağatay',
        'Ayşe',
        'Berna',
        'Tolga',
        'Emine',
        'Veli',
        'Abdullah',
        'Muzaffer',
        'Aşkım',
        'Alperen',
        'Taha',
        'Arzum',
        'Orhan',
        'Ceylan',
        'Fatma',
        'Kazım',
        'Tarkan',
        'Cem Yılmaz',
        'Cem KAraca',
        'Ahmet Kaya',
        'Ece Ronay',
        'Ece Mummay',
        'Sagopa',
        'Ezhel',
        'Ben Fero',
        'Rihanna',
        'İsmail YK',
        'Serdar Ortaç',
        'Erdoğan',
        'Arda',
        'Selçuk',
        'Devlet',
        'Nazım Hikmet',
        'Ercüment',
        'Behzat',
        'Namık Kemal',
        'Beren Saat',
        'Bahar Candan',
        'Acun Ilıcalı',
        'Zeynep Bastık',
        'Naim Süleymanoğlu',
        'Bold Pilot',
      ],
      scroll_items: [],
      selected_celebrity: '',
    };
  }

  componentWillMount() {
    this.props.navigation.setOptions({
      title: translate('app_name'),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('SavingsPage')}>
          <Image
            source={RIGHT_HEADER_ICON}
            style={{height: 35, width: 35, marginRight: 15}}
          />
        </TouchableOpacity>
      ),
    });
  }

  componentDidMount() {
    interstitial.onAdEvent((type) => {
      if (type === AdEventType.LOADED) {
        this.setState({loaded: true});
      }
    });

    // Start loading the interstitial straight away
    interstitial.load();
  }

  updateSearch = (search) => this.setState({search: search});

  showActionSheet = () => this.actionSheet.show();

  getActionSheetRef = (ref) => (this.actionSheet = ref);

  handlePress = (index) => this.setState({selected: index});

  WhenTheLanguageChanged = () => this.forceUpdate();

  LaunchCamera = async () =>
    await GetUserPhotoFromCamera(this.props.get_user_avatar_source);

  LaunchImageLibrary = async () =>
    await GetUserPhotoFromImageLibrary(this.props.get_user_avatar_source);

  SelectAvatar = () => this.showActionSheet();

  shouldComponentUpdate = async (nextProps, nextState) => {
    const {userAvatarSource, language} = this.props;
    const {search} = this.state;

    if (nextProps.language.languageTag !== language.languageTag) {
      await this.WhenTheLanguageChanged();
    }

    if (userAvatarSource !== nextProps.userAvatarSource) {
      interstitial.load();
      this.actionSheet.hide();
    }

    if (search !== nextState.search) {
      this.fillScroll(nextState.search);
    }
  };

  GetActionSheet = () => {
    return (
      <ActionSheetComponent
        launchImageLibrary={this.LaunchImageLibrary}
        launchCamera={this.LaunchCamera}
        handlePress={this.handlePress}
        getActionSheetRef={this.getActionSheetRef}
      />
    );
  };

  CheckValidity = () => {
    const {userAvatarSource} = this.props;
    const {selected_celebrity} = this.state;

    if (userAvatarSource === '') {
      Alert.alert('', translate('home.avatar_warning'));
      return false;
    } else if (selected_celebrity === '') {
      Alert.alert('', translate('home.select_warning'));
      return false;
    }

    return true;
  };

  GetResult = async () => {
    const {userAvatarB64} = this.props;

    if (this.CheckValidity()) {
      this.setState({result_loading: true});
      interstitial.onAdEvent((type) => {
        if (type !== AdEventType.LOADED) {
          interstitial.load();
        }
      });

      GetResult(userAvatarB64).then((res) => {
        console.log('res: ', res);
        const {selected_celebrity} = this.state;

        try {
          interstitial.show();
          this.props.navigation.navigate('ResultPage2', {
            selected_celebrity: selected_celebrity,
          });
          this.setState({result_loading: false});
        } catch (e) {
          console.log('error on response: ', e);
        }
      });
    }
  };

  fillScroll = async (search) => {
    const {celebrities} = this.state;

    if (search.length > 1) {
      const items = celebrities.map((item) => {
        if (item.includes(search)) {
          return (
            <TouchableOpacity
              style={styles.scrollTextContainer}
              onPress={() => this.CelebritySelected(item)}>
              <Text style={styles.scrollTextStyle}>{item}</Text>
            </TouchableOpacity>
          );
        }
      });
      this.setState({scroll_items: items});
    } else {
      this.setState({scroll_items: []});
    }
  };

  CelebritySelected = (celebrity) => {
    this.setState({
      search: '',
      scroll_items: [],
      selected_celebrity: celebrity,
    });
  };

  render() {
    const {userAvatarSource} = this.props;
    const {search, scroll_items, selected_celebrity} = this.state;

    return (
      <View style={styles.backgroundImageStyle}>
        <SafeAreaView style={styles.mainContainer}>
          <View style={styles.labelsContainerStyle}>
            <SearchBarComponent
              search={search}
              updateSearch={this.updateSearch}
              selectedCelebrity={selected_celebrity}
            />

            <View display={search !== '' ? 'flex' : 'none'}>
              <ScrollView style={{maxHeight: DEVICE_HEIGHT * 0.45}}>
                <View style={styles.scrollViewStyle}>{scroll_items}</View>
              </ScrollView>
            </View>

            <View
              display={
                search === '' && selected_celebrity === '' ? 'flex' : 'none'
              }
              style={styles.topLabel2ContainerStyle}>
              <Text style={styles.topLabel2Style}>
                {translate('famous_compare.compare_header')}
              </Text>
            </View>

            <View
              display={selected_celebrity !== '' ? 'flex' : 'none'}
              style={styles.topLabel2ContainerStyle}>
              <Text style={styles.selectedLabelTextStyle}>
                {translate('home.selected_celebrity')}
              </Text>
              <Text style={styles.selectedCelebrityTextStyle}>
                {selected_celebrity}
              </Text>
            </View>
          </View>

          <View
            display={search === '' ? 'flex' : 'none'}
            style={styles.iconsMainContainerStyle}>
            <AvatarComponent
              ImageSource={userAvatarSource}
              SelectAvatar={() => this.SelectAvatar()}
            />
          </View>

          <View display={search === '' ? 'flex' : 'none'}>
            <Button
              title={translate('home.get_result')}
              buttonStyle={styles.resultButtonStyle}
              titleStyle={{fontSize: 18, fontWeight: '600'}}
              onPress={() => this.GetResult()}
              loading={this.state.result_loading}
            />
          </View>
          {this.GetActionSheet()}
        </SafeAreaView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.mainReducer.language,
    userAvatarSource: state.mainReducer.userAvatarSource,
    userAvatarB64: state.mainReducer.userAvatarB64,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get_user_avatar_source: (source, base64_data) =>
      dispatch(get_user_avatar_source(source, base64_data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage2);
