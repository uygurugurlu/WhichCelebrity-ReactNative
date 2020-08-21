import {ResponseHandler} from '../CommunlyUsedFunctions';
import Config from 'react-native-config';
import {api} from "./AxiosCacheAdapter";

export const SearchCelebrities = async (user_agent, search) => {
  try {
    const {data} = await api.get(`${Config.API}/api/celebrities/${search}`, {
      headers: {
        'Authorization': `Bearer ${Config.TOKEN}`,
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
