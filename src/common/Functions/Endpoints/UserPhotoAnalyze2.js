import {AUTH_TOKEN, API_HOST} from '../../../config';
import RNFetchBlob from "rn-fetch-blob";

export const UserPhotoAnalyze2 = (user_agent, image_data, celebrity_id, locale) => {

  return RNFetchBlob.fetch('POST', `${API_HOST}/api/analyze`, {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${AUTH_TOKEN}`,
  }, [
    // element with property `filename` will be transformed into `file` in form data
    {name: 'image', filename: 'photo.png', type: 'image/jpg/jpeg/png', data: image_data},
    {name: "celebrity", data: celebrity_id},
    {name: 'locale', data: locale}
  ]);

};

