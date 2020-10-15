import { API_HOST } from '../../../config';
import { api } from '../AxiosCacheAdapter';

export const ConfirmUser = async (auth_token) => await api.get(`${API_HOST}/api/me`, {
  headers: {
    Authorization: `Bearer ${auth_token}`,
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
