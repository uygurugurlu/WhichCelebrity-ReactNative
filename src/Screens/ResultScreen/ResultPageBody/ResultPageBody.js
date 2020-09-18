import React, {Component} from 'react';
import {
  Animated,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './ResultPageBodyStyles';
import {DEVICE_WIDTH, HEADSTONE2, shadow} from '../../../common/Constants';
import {translate} from '../../../I18n';
import AnimatedProgressBar from '../../../common/Components/AnimatedProgressBar';
import AnimatedProgressComponent from '../../../common/Components/AnimatedProgressComponent';
import ResultLineComponent from '../../../common/Components/ResultLineComponent';
import SwipeableImageModal from '../../../common/Components/SwipeableImageModal';

class ResultPageBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready_to_share: false,
      share_active: true,
      progress: new Animated.Value(0),
      data: this.props.data,
      isVisible: false,
      modal_uri: '',
      nationality: '',
      category: '',
      star_sign: '',
      hide_age: '',
      grave_flex: '',
      age: '',
      birthday: '',
      photo: '',
      name: '',
      swiper_index: 0,
      index: 0,
      title: '',
    };
  }

  componentWillMount = async () => {
    const {data, titleIndex} = this.props;
    let nationality = '',
      category = '',
      star_sign = '',
      hide_age = '',
      grave_flex = '',
      age = '',
      birthday = '',
      photo = '',
      name = '',
      similarity = '',
      title = '';
    const celebrity = data.celebrity;

    hide_age =
      celebrity.birthday === null ||
      celebrity.birthday === '' ||
      typeof celebrity.birthday === 'undefined';
    grave_flex =
      typeof celebrity.dead !== 'undefined' &&
      celebrity.dead !== null &&
      celebrity.dead;
    age = typeof (celebrity.age !== 'undefined' && celebrity.age !== null)
      ? celebrity.age
      : '';
    birthday = typeof (
      celebrity.birthday !== 'undefined' && celebrity.birthday !== null
    )
      ? celebrity.birthday
      : '';
    name = typeof (celebrity.name !== 'undefined' && celebrity.name !== null)
      ? celebrity.name
      : '';
    photo = typeof (celebrity.photo !== 'undefined' && celebrity.photo !== null)
      ? celebrity.photo
      : '';

    try {
      similarity = typeof (
        data.similarity !== 'undefined' && data.similarity !== null
      )
        ? data.similarity
        : '';
    } catch (e) {
      console.log('Error componentWillMount: ', e);
      similarity = '';
    }

    try {
      nationality = typeof (
        celebrity.nationality.name !== 'undefined' &&
        celebrity.nationality.name !== null
      )
        ? celebrity.nationality.name
        : '';
    } catch (e) {
      console.log('Error componentWillMount: ', e);
      nationality = '';
    }

    try {
      category = typeof (
        celebrity.category.name !== 'undefined' &&
        celebrity.category.name !== null
      )
        ? celebrity.category.name
        : '';
    } catch (e) {
      category = '';
    }

    try {
      star_sign = typeof (
        celebrity.star_sign.name !== 'undefined' &&
        celebrity.star_sign.name !== null
      )
        ? celebrity.star_sign.name
        : '';
    } catch (e) {
      star_sign = '';
    }

    switch (titleIndex) {
      case 0:
        title = translate('result.first_similar');
        break;
      case 1:
        title = translate('result.second_similar');
        break;
      case 2:
        title = translate('result.third_similar');
        break;
      case 3:
        title = translate('result.third_similar');
        break;
    }

    this.setState({
      category: category,
      nationality: nationality,
      star_sign: star_sign,
      grave_flex: grave_flex,
      hide_age: hide_age,
      age: age,
      birthday: birthday,
      name: name,
      photo: photo,
      similarity: similarity,
      title: title,
    });
  };

  handleModalVisibility = (index) => {
    const {isVisible, photo} = this.state;
    const {userAvatarSource} = this.props;

    if (index === 0) {
      this.setState({
        isVisible: !isVisible,
        modal_uri: userAvatarSource,
        index: index,
      });
    }

    if (index === 1) {
      this.setState({isVisible: !isVisible, modal_uri: photo, index: index});
    }
  };

  render() {
    const {
      similarity,
      name,
      title,
      photo,
      hide_age,
      grave_flex,
      age,
      index,
      birthday,
      nationality,
      category,
      star_sign,
      isVisible,
      modal_uri,
    } = this.state;
    const {userAvatarSource} = this.props;

    return (
      <View style={[styles.mainContainer]}>
        <View style={[styles.iconContainerStyle, shadow]}>
          <TouchableOpacity onPress={() => this.handleModalVisibility(0)}>
            <Image source={userAvatarSource} style={styles.iconStyle} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.handleModalVisibility(1)}>
            <Image source={{uri: photo}} style={styles.iconStyle} />
          </TouchableOpacity>
        </View>

        <View style={{alignItems: 'center', width: DEVICE_WIDTH * 0.9}}>
          <Text style={styles.titleTextStyle}>{title}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AnimatedProgressBar fill={similarity} />
            <AnimatedProgressComponent fill={similarity} />
          </View>
        </View>

        <ScrollView style={styles.labelContainerStyle}>
          <ResultLineComponent
            leftText={translate('result.celebrity') + ': '}
            rightText={name}
          />

          <View
            display={hide_age ? 'none' : 'flex'}
            style={{flexDirection: 'row', marginRight: 25}}>
            <ResultLineComponent
              leftText={translate('result.birthday') + ': '}
              rightText={
                birthday + ', ' + age + ' ' + translate('result.years')
              }
            />

            <View display={grave_flex ? 'flex' : 'none'}>
              <Image style={styles.graveIconStyle} source={HEADSTONE2} />
            </View>
          </View>

          <ResultLineComponent
            leftText={translate('result.category') + ': '}
            rightText={category}
          />

          <ResultLineComponent
            leftText={translate('result.nationality') + ': '}
            rightText={nationality}
          />

          <ResultLineComponent
            leftText={translate('result.zodiac_sign') + ': '}
            rightText={star_sign}
          />
        </ScrollView>

        <SwipeableImageModal
          uri={modal_uri}
          index={index}
          isVisible={isVisible}
          handleVisibility={() => this.handleModalVisibility(index)}
        />
      </View>
    );
  }
}

export default ResultPageBody;
