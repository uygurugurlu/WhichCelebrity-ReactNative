import {ResponseHandler} from './ResponseHandler';
import Config from 'react-native-config';
import RNFetchBlob from "rn-fetch-blob";
import {TOKEN} from "../Constants";

export const UserPhotoAnalyze = async (user_agent, image_data, celebrity_id) => {
  const body = celebrity_id === null ?
    [
      // element with property `filename` will be transformed into `file` in form data
      {name: 'image', filename: 'photo.png', type: 'image/jpg/jpeg/png', data: image_data},
    ]
    :
    [
      // element with property `filename` will be transformed into `file` in form data
      {name: 'image', filename: 'photo.png', type: 'image/jpg/jpeg/png', data: image_data},
      {name: "celebrity", data: celebrity_id}
    ];

  try {
    const {data} = await RNFetchBlob.fetch('POST', `${Config.API}/api/analyze`, {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${TOKEN}`,
    }, body);

    return data;
  } catch (error) {
    ResponseHandler('GetCelebrities Response: ', error.response);
    console.group('GetCelebrities Error ...');
    console.table({...error.response.data});
    console.groupEnd();
  }

  return {};
};

