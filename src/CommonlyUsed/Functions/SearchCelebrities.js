import {ResponseHandler} from './ResponseHandler';
import Config from 'react-native-config';
import {api} from "./AxiosCacheAdapter";
import {TOKEN} from "../Constants";

export const SearchCelebrities = async (user_agent, search) => {
  try {

    const {data} = await api.get(`${Config.API}/api/celebrities/search/${search}`, {
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
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
