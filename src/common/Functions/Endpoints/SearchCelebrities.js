import {ResponseHandler} from '../ResponseHandler';
import {AUTH_TOKEN, API_HOST} from '../../../config';
import {api} from '../AxiosCacheAdapter';

export const SearchCelebrities = async (user_agent, search, auth_token) => {
  try {
    const {data} = await api.get(
      `${API_HOST}/api/celebrities/search/${search}`,
      {
        headers: {
          Authorization: `Bearer ${auth_token}`,
          'User-Agent': user_agent,
        },
      },
    );

    return data;
  } catch (error) {
    ResponseHandler('SearchCelebrities Response: ', error.response);
    console.group('SearchCelebrities Error ...');
    console.table({...error.response.data});
    console.groupEnd();
  }

  return {};
};
