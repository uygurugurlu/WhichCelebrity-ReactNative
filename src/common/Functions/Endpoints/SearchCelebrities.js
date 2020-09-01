import {ResponseHandler} from '../ResponseHandler';
import {AUTH_TOKEN, API_HOST} from '../../../config';
import {api} from "../AxiosCacheAdapter";

export const SearchCelebrities = async (user_agent, search) => {
  try {
    const {data} = await api.get(`${API_HOST}/api/celebrities/search/${search}`, {
      headers: {
        'Authorization': `Bearer ${AUTH_TOKEN}`,
        'User-Agent': user_agent,
      }
    });

    return data;
  } catch (error) {
    ResponseHandler('SearchCelebrities Response: ', error.response);
    console.group('SearchCelebrities Error ...');
    console.table({...error.response.data});
    console.groupEnd();
  }

  return {};
};
