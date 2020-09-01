import {ResponseHandler} from '../ResponseHandler';
import {AUTH_TOKEN, API_HOST} from '../../../config';
import RNFetchBlob from "rn-fetch-blob";

export const UserPhotoAnalyze2 = async (user_agent, image_data, celebrity_id) => {

  console.log("UserPhotoAnalyze AUTH_TOKEN: ", AUTH_TOKEN);
  console.log("UserPhotoAnalyze API_HOST: ", API_HOST);

  try {
    const {data} = await RNFetchBlob.fetch('POST', `${API_HOST}/api/analyze`, {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${AUTH_TOKEN}`,
    }, [
      // element with property `filename` will be transformed into `file` in form data
      {name: 'image', filename: 'photo.png', type: 'image/jpg/jpeg/png', data: image_data},
      {name: "celebrity", data: celebrity_id}
    ]);

    return data;
  } catch (error) {
    ResponseHandler('GetCelebrities Response: ', error.response);
    console.group('GetCelebrities Error ...');
    console.table({...error.response.data});
    console.groupEnd();
  }

  return {};
};

