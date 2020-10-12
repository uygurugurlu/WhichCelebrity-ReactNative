import {API_HOST, AUTH_TOKEN} from '../../../config';
import {api} from '../AxiosCacheAdapter';

export const GetAppVersion = async (user_agent, token) => {
  console.log('HOST: ', API_HOST);
  console.log('AUTH_TOKEN: ', AUTH_TOKEN);


  return await api.get(`${API_HOST}/api/version`, {
    headers: {
      'User-Agent': user_agent,
    },
  });
};
