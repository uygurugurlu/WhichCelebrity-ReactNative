import { API_HOST } from '../../../config';
import { api } from '../AxiosCacheAdapter';

export const UngrantPermission = async (auth_token, user_agent) => {
  console.log(auth_token);
  return api.put(`${API_HOST}/api/me/opt-out`, null, {
    headers: {
      Authorization: `Bearer ${auth_token}`,
    },
  });
};
