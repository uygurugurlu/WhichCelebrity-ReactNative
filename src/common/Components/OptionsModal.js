import React, { Component } from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'
import { translate } from '../../I18n'
import { Icon } from 'react-native-elements'
import { DEVICE_WIDTH } from '../Constants'

export default class OptionsModal extends Component{

  render() {
    const {options} = this.props;
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

const styles = StyleSheet.create({
  settingsModalContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: DEVICE_WIDTH - 20,
    backgroundColor: 'rgb(240,240,240)',
    borderRadius: 15,
  },
  settingsMainButtons: {
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    width: DEVICE_WIDTH - 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(100,100,100)',
    flexDirection: 'row',
  },
  settingsButton: {
    textAlign: 'center',
    color: '#1a84f4',
    fontSize: 19,
  },
  cancelButtonContainer: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    height: 50,
    justifyContent: 'center',
    width: DEVICE_WIDTH - 20,
    borderRadius: 15,
    backgroundColor: 'rgb(240,240,240)',
  },
  cancelButton: {
    textAlign: 'center',
    color: 'red',
    fontSize: 19,
  },
})
