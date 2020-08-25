import {ResponseHandler} from './ResponseHandler';
import Config from 'react-native-config';
import RNFetchBlob from "rn-fetch-blob";
import {TOKEN} from "../Constants";

export const UserPhotoAnalyze = async (user_agent, image_data) => {

  RNFetchBlob.fetch('POST', `${Config.API}/api/analyze`, {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${TOKEN}`,
  }, [
    // element with property `filename` will be transformed into `file` in form data
    {name: 'image', filename: 'photo.png', type: 'image/jpg/jpeg/png', data: image_data},
    // {celebrity: uuid}
  ]).then((resp) => {
    console.log(resp);
    // ...
  }).catch((error) => {
    // ...
    ResponseHandler('UserPhotoAnalyze Response: ', error.response);
    console.group('UserPhotoAnalyze Error ...');
    console.table({...error.response.data});
    console.groupEnd();
  });

};

