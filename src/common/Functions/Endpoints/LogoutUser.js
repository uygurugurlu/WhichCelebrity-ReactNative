import { API_HOST } from '../../../config';
import { api } from '../AxiosCacheAdapter';

export const LogoutUser = async (auth_token) => api.get(`${API_HOST}/api/logout`, {
  headers: {
    Authorization: `Bearer ${auth_token}`,
  },
});
