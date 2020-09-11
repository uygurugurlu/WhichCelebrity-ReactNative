import {translate} from "../../I18n";
import CameraRoll from "@react-native-community/cameraroll";
import {Alert} from "react-native";
import {ShowBaseToast} from "../Components/ShowBaseToast";

export const SavePicture = async (uri, HasAndroidPermission, trigger_savings_page, hide) => {
  await HasAndroidPermission();

  const saveToCameraRollOptions = {
    type: 'photo',
    album: translate('app_name'),
  };

  CameraRoll.save(uri, saveToCameraRollOptions)
    .then(async (res) => {
      trigger_savings_page();
      ShowBaseToast(translate('result.result_saved'), "SHORT", "TOP", "SUCCESS");
    })
    .catch((err) => {
      console.log('err: ', err);
      hide();
    });
};
