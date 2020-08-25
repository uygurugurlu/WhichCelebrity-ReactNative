import ImagePicker from 'react-native-image-crop-picker';
import {translate} from '../../I18n';

export const GetUserPhotoFromImageLibrary = async (
  get_mono_user_avatar_source,
) => {
  ImagePicker.openPicker({
    width: 300,
    height: 300,
    cropping: true,
    includeBase64: true,
    cropperChooseText: translate('image_picker.choose'),
    cropperCancelText: translate('image_picker.cancel'),
  }).then((image) => {
    console.log("image path: ", image.path);
    get_mono_user_avatar_source({uri: image.path}, image.data);
  });
};
