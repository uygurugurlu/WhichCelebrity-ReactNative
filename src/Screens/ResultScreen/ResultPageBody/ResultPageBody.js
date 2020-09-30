import React, {Component} from 'react';
import {
  Animated,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import {styles} from './ResultPageBodyStyles';
import {
  DEVICE_WIDTH,
  HEADSTONE2,
  shadow,
  RESULTCARDBACK,
} from '../../../common/Constants';
import {translate} from '../../../I18n';
import AnimatedProgressBar from '../../../common/Components/AnimatedProgressBar';
import AnimatedProgressComponent from '../../../common/Components/AnimatedProgressComponent';
import ResultLineComponent from '../../../common/Components/ResultLineComponent';
import SwipeableImageModal from '../../../common/Components/SwipeableImageModal';
const CONTAINER_MARGIN = 10;

const celebrityIcon = require('../../../assets/icons/celebrityIcon.png');
const calendarIcon = require('../../../assets/icons/calendarIcon.png');
const categoryIcon = require('../../../assets/icons/categoryIcon.png');
const nationalityIcon = require('../../../assets/icons/nationalityIcon.png');
const zodiacIcon = require('../../../assets/icons/zodiacIcon.png');


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

      size: 0,
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
        <ImageBackground style={styles.imageBack} source={RESULTCARDBACK}>
          <View style={styles.imagesContainer}>
            <View
              style={styles.imagesWrapper}
              onLayout={(event) => {
                var {x, y, width, height} = event.nativeEvent.layout;
                var value = Math.min(width / 2, height);
                this.setState({size: value});
              }}>
              <TouchableOpacity onPress={() => this.handleModalVisibility(0)}>
                <View
                  style={[
                    styles.imageWrap,
                    {height: this.state.size - 10, width: this.state.size - 10},
                  ]}>
                  <Image source={userAvatarSource} style={styles.cameraImage} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.handleModalVisibility(1)}>
                <View
                  style={[
                    styles.imageWrap,
                    {height: this.state.size - 10, width: this.state.size - 10},
                  ]}>
                  <Image source={{uri: photo}} style={styles.cameraImage} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/*<View style={[styles.iconContainerStyle, shadow]}>
            <TouchableOpacity onPress={() => this.handleModalVisibility(0)}>
              <Image source={userAvatarSource} style={styles.iconStyle} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.handleModalVisibility(1)}>
              <Image source={{uri: photo}} style={styles.iconStyle} />
            </TouchableOpacity>
          </View>
          */}
          <View style={styles.similarityContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.titleTextStyle}>{title}</Text>
            </View>
            <View style={styles.animatedSimilarityContainer}>
            <AnimatedProgressComponent fill={similarity} />

            <AnimatedProgressBar fill={similarity} margin={30 - CONTAINER_MARGIN}/>
            </View>

          </View>
          
          <View style={styles.labelContainerStyle}>
            <ResultLineComponent
              leftText={translate('result.celebrity') + ': '}
              rightText={name}
              icon= {celebrityIcon}
            />

            <View
              display={hide_age ? 'none' : 'flex'}>
              <ResultLineComponent
                leftText={translate('result.birthday') + ': '}
                rightText={
                  birthday + ', ' + age + ' ' + translate('result.years')
                }
                icon= {calendarIcon}

              />

              <View display={grave_flex ? 'flex' : 'none'}>
                <Image style={styles.graveIconStyle} source={HEADSTONE2} />
              </View>
            </View>

            <ResultLineComponent
              leftText={translate('result.category') + ': '}
              rightText={category}
              icon= {categoryIcon}

            />

            <ResultLineComponent
              leftText={translate('result.nationality') + ': '}
              rightText={nationality}
              icon= {nationalityIcon}

            />

            <ResultLineComponent
              leftText={translate('result.zodiac_sign') + ': '}
              rightText={star_sign}
              icon= {zodiacIcon}
              

            />
          </View>

          <SwipeableImageModal
            uri={modal_uri}
            index={index}
            isVisible={isVisible}
            handleVisibility={() => this.handleModalVisibility(index)}
          />
        </ImageBackground>
      </View>
    );
  }
}

export default ResultPageBody;
