import React, { Component } from 'react'
import { ImageBackground, Modal, Text, TouchableOpacity, View } from 'react-native'
import { styles } from '../../Screens/HomeScreen/HomePageStyles'
import { translate } from '../../I18n'
import { Icon } from 'react-native-elements'

export default class OptionsModal extends Component{

  render() {
    return(
      <Modal
        visible={this.state.optionsModalVisible}
        transparent
        animationType="slide"
      >

        <TouchableOpacity onPress={() => this.setState({optionsModalVisible: false})} style={styles.bottomModal}>
          <View style={styles.settingsModalContainer}>
            <TouchableOpacity
              onPress={async () => {

                await this.setState({optionsModalVisible: false});
                await setTimeout(() => {this.LaunchCamera();}, 200);
              }}
              style={styles.settingsMainButtons}
            >
              <Text style={styles.settingsButton}>{translate('image_picker.use_camera')}</Text>
              <Icon
                name="camera-alt"
                color="#1a84f4"
                style={{ margin: 4, alignSelf: 'center' }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                await this.setState({optionsModalVisible: false});
                await setTimeout(() => {this.LaunchImageLibrary();}, 200);
              }}
              style={styles.settingsMainButtons}
            >
              <Text style={styles.settingsButton}>{translate('image_picker.photo_library')}</Text>
              <Icon
                name="photo-library"
                color="#1a84f4"
                style={{ margin: 4, alignSelf: 'center' }}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => this.setState({ optionsModalVisible: false })}
            style={styles.cancelButtonContainer}
          >
            <Text style={styles.cancelButton}>{translate('image_picker.cancel')}</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    )
  }
}
