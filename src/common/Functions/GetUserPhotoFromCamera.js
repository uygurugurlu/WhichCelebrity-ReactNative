import ImagePicker from 'react-native-image-crop-picker';

export const GetUserPhotoFromCamera = async () => {
  return await ImagePicker.openCamera({
    width: 300,
    height: 300,
    cropping: true,
    includeBase64: true,
    compressImageQuality: 0.8,
    mediaType: 'photo',
  });
};
