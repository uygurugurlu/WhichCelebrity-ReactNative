import RNFetchBlob from 'rn-fetch-blob';
import { AUTH_TOKEN, API_HOST } from '../../../config';

export const UserPhotoAnalyze = async (
  user_agent,
  image_data,
  category,
  locale,
  gender,
  auth_token,
) => {
  console.log('category: ', category);
  console.log('gender: ', gender);

  let body = [];

  if (category === -1) {
    if (gender === null) {
      body = [
        // element with property `filename` will be transformed into `file` in form data
        {
          name: 'image',
          filename: 'photo.png',
          type: 'image/jpg/jpeg/png',
          data: image_data,
        },
        { name: 'locale', data: locale },
      ];
    } else {
      body = [
        // element with property `filename` will be transformed into `file` in form data
        {
          name: 'image',
          filename: 'photo.png',
          type: 'image/jpg/jpeg/png',
          data: image_data,
        },
        { name: 'locale', data: locale },
        { name: 'gender', data: gender },
      ];
    }
  } else if (gender === null) {
    body = [
      // element with property `filename` will be transformed into `file` in form data
      {
        name: 'image',
        filename: 'photo.png',
        type: 'image/jpg/jpeg/png',
        data: image_data,
      },
      { name: 'category', data: category },
      { name: 'locale', data: locale },
    ];
  } else {
    body = [
      // element with property `filename` will be transformed into `file` in form data
      {
        name: 'image',
        filename: 'photo.png',
        type: 'image/jpg/jpeg/png',
        data: image_data,
      },
      { name: 'category', data: category },
      { name: 'locale', data: locale },
      { name: 'gender', data: gender },
    ];
  }

  return RNFetchBlob.fetch(
    'POST',
    `${API_HOST}/api/v3/analyze`,
    {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${auth_token}`,
      'User-Agent': user_agent,
    },
    body,
  );
};
