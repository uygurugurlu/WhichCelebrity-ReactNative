import { API_HOST } from '../../../config';
import { api } from '../AxiosCacheAdapter';

export const LogoutUser = async (auth_token) => {
  console.log(auth_token);
  return api.get(`${API_HOST}/api/logout`, {
    headers: {
      Authorization: `Bearer ${auth_token}`,
    },
  });
};
