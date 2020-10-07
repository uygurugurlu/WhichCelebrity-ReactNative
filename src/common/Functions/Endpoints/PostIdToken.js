import axios from 'axios';
import {API_HOST, AUTH_TOKEN} from '../../../config';

export const PostIdToken = async (id_token) => {
  let body = '';
  body = {
    token: id_token,
  };

  return axios.post(`${API_HOST}/api/firebase/login`, body, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
    },
  });
};
