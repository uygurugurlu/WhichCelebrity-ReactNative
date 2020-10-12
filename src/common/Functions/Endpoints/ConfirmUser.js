import {AUTH_TOKEN, API_HOST} from '../../../config';
import {api} from '../AxiosCacheAdapter';
export const ConfirmUser = async (auth_token) => {
    console.log( auth_token);
  return await api.get(`${API_HOST}/api/me`, {
    headers: {
      Authorization: `Bearer ${auth_token}`,
    },
  });
};
