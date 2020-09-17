import {API_HOST, AUTH_TOKEN} from '../../../config';
import {api} from "../AxiosCacheAdapter";

export const GetAppVersion = async (user_agent, token) => {
  return await api.get(`${API_HOST}/api/version`, {
    headers: {
      'Authorization': `Bearer ${AUTH_TOKEN}`,
      'User-Agent': user_agent,
    },
  });
};
