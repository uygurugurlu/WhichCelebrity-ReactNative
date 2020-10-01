import {ResponseHandler} from '../ResponseHandler';
import {AUTH_TOKEN, API_HOST} from '../../../config';
import {api} from '../AxiosCacheAdapter';

export const GetCelebrities = async (user_agent) => {
  try {
    const {data} = await api.get(`${API_HOST}/api/celebrities`, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
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
