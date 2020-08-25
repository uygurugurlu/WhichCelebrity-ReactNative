import {ResponseHandler} from './ResponseHandler';
import Config from 'react-native-config';
import {api} from "./AxiosCacheAdapter";
import {TOKEN} from "../Constants";

export const GetCelebrity = async (user_agent, id) => {
  try {
    const {data} = await api.get(`${Config.API}/api/celebrities/${id}`, {
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'User-Agent': user_agent,
      }
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
