import ImagePicker from 'react-native-image-crop-picker';

export const GetUserPhotoFromCamera = (get_mono_user_avatar_source) => {
  ImagePicker.openCamera({
    width: 300,
    height: 300,
    cropping: true,
    includeBase64: true,
    compressImageQuality:0.8
  }).then((image) => {
    get_mono_user_avatar_source({uri: image.path}, image.data);
  });
};
