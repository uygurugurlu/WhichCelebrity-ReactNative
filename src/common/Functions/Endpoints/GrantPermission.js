import { API_HOST } from '../../../config';
import { api } from '../AxiosCacheAdapter';

export const GrantPermission = async (auth_token, user_agent) => {
  console.log(auth_token);
  return api.put(`${API_HOST}/api/me/opt-in`, null, {
    headers: {
      Authorization: `Bearer ${auth_token}`,
    },
  });
};
