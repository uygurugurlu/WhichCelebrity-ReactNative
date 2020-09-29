import RNFS from 'react-native-fs';

export const ConvertImageBase64 = async (imagePath) => {
  try {
    return await RNFS.readFile(imagePath, 'base64');
  } catch (e) {
    console.log('Error converting image: ', e);
  }
};
