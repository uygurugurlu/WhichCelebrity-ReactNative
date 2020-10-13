import { AUTH_TOKEN, API_HOST } from '../../../config';
import { api } from '../AxiosCacheAdapter';

export const GetCategories = async (user_agent, locale, auth_token) => await api.get(`${API_HOST}/api/categories?locale=${locale}`, {
  headers: {
    Authorization: `Bearer ${auth_token}`,
    'User-Agent': user_agent,
  },
});
