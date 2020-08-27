import {translate} from "../../I18n";
import CameraRoll from "@react-native-community/cameraroll";
import {Alert} from "react-native";

export const SavePicture = async (uri, HasAndroidPermission, trigger_savings_page, hide) => {
  await HasAndroidPermission();

  const saveToCameraRollOptions = {
    type: 'photo',
    album: translate('app_name'),
  };

  CameraRoll.save(uri, saveToCameraRollOptions)
    .then(async (res) => {
      trigger_savings_page();
      Alert.alert(
        translate('result.result_saved'),
        '',
        [
          {
            text: translate('result.okay'),
            onPress: () => hide(),
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    })
    .catch((err) => {
      console.log('err: ', err);
      hide();
    });
};
