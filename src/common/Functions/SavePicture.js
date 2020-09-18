import {translate} from '../../I18n';
import CameraRoll from '@react-native-community/cameraroll';
import {ShowSnackBar} from '../Components/ShowSnackBar';
import {SaveResultEvent} from './AnalyticEvents/Events';

export const SavePicture = async (
  uri,
  HasAndroidPermission,
  trigger_savings_page,
  hide,
) => {
  await HasAndroidPermission();

  const saveToCameraRollOptions = {
    type: 'photo',
    album: translate('app_name'),
  };

  CameraRoll.save(uri, saveToCameraRollOptions)
    .then(async (res) => {
      trigger_savings_page();
      SaveResultEvent();
      ShowSnackBar(translate('result.result_saved'), 'SHORT', 'TOP', 'SUCCESS');
    })
    .catch((err) => {
      console.log('err: ', err);
      hide();
    });
};
