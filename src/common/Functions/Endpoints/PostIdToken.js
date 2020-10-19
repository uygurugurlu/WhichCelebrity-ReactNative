import { API_HOST } from '../../../config';
import { api } from '../AxiosCacheAdapter';

export const PostIdToken = async (id_token, user_agent) => {
  let body = '';
  body = {
    token: id_token,
  };

  return api.post(`${API_HOST}/api/firebase/login`, body, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      'User-Agent': user_agent,
    }
  });
};
