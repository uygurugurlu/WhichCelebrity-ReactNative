import {AUTH_TOKEN, API_HOST} from '../../../config';
import {api} from "../AxiosCacheAdapter";

export const GetCategories = async (user_agent, locale) => {
  return await api.get(`${API_HOST}/api/categories?locale=${locale}`, {
    headers: {
      'Authorization': `Bearer ${AUTH_TOKEN}`,
      'User-Agent': user_agent,
    }
  });

};
