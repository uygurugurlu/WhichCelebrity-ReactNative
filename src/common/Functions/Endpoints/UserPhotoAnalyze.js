import {ResponseHandler} from '../ResponseHandler';
import {AUTH_TOKEN, API_HOST} from '../../../config';
import RNFetchBlob from "rn-fetch-blob";

export const UserPhotoAnalyze = async (user_agent, image_data, category, locale, gender) => {

  console.log("UserPhotoAnalyze AUTH_TOKEN: ", AUTH_TOKEN);
  console.log("UserPhotoAnalyze API_HOST: ", API_HOST);
  console.log("category: ", category);
  console.log("gender: ", gender);

  let body = category === -1 ?
    [
      // element with property `filename` will be transformed into `file` in form data
      {name: 'image', filename: 'photo.png', type: 'image/jpg/jpeg/png', data: image_data},
      {name: 'locale', data: locale}
    ]
    :
    [
      // element with property `filename` will be transformed into `file` in form data
      {name: 'image', filename: 'photo.png', type: 'image/jpg/jpeg/png', data: image_data},
      {name: "category", data: category},
      {name: 'locale', data: locale}
    ];

  if (category === -1) {
    if (gender === null) {
      body = [
        // element with property `filename` will be transformed into `file` in form data
        {name: 'image', filename: 'photo.png', type: 'image/jpg/jpeg/png', data: image_data},
        {name: 'locale', data: locale}
      ]
    } else {
      body = [
        // element with property `filename` will be transformed into `file` in form data
        {name: 'image', filename: 'photo.png', type: 'image/jpg/jpeg/png', data: image_data},
        {name: 'locale', data: locale},
        {name: 'gender', data: gender}
      ]
    }

  } else {
    if (gender === null) {
      body = [
        // element with property `filename` will be transformed into `file` in form data
        {name: 'image', filename: 'photo.png', type: 'image/jpg/jpeg/png', data: image_data},
        {name: "category", data: category},
        {name: 'locale', data: locale}
      ];
    } else {
      body = [
        // element with property `filename` will be transformed into `file` in form data
        {name: 'image', filename: 'photo.png', type: 'image/jpg/jpeg/png', data: image_data},
        {name: "category", data: category},
        {name: 'locale', data: locale},
        {name: 'gender', data: gender}

      ];
    }


  }


  try {
    const {data} = await RNFetchBlob.fetch('POST', `${API_HOST}/api/analyze`, {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${AUTH_TOKEN}`,
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

