import {ResponseHandler} from '../ResponseHandler';
import {AUTH_TOKEN, API_HOST} from '../../../config';
import {api} from '../AxiosCacheAdapter';

export const GetCelebrity = async (user_agent, id, auth_token) => {
  try {
    const {data} = await api.get(`${API_HOST}/api/celebrities/${id}`, {
      headers: {
        Authorization: `Bearer ${auth_token}`,
        'User-Agent': user_agent,
      },
    });

    return data;
  } catch (error) {
    ResponseHandler('GetCelebrities Response: ', error.response);
    console.group('GetCelebrities Error ...');
    console.table({...error.response.data});
    console.groupEnd();
  }

  return {};
};
