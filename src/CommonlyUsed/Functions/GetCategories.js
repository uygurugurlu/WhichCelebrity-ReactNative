import {ResponseHandler} from '../CommunlyUsedFunctions';
import Config from 'react-native-config';
import {api} from "./AxiosCacheAdapter";

export const GetCategories = async (user_agent) => {
  try {
    console.log("Config.API: ", Config.API)
    const {data} = await api.get(`${Config.API}/api/categories`, {
      headers: {
        'Authorization': `Bearer ${Config.TOKEN}`,
        'User-Agent': user_agent,
      }
    });
    return data;

  } catch (error) {
    ResponseHandler('GetCategories Response: ', error.response);
    console.group('GetCategories Error ...');
    console.table({...error.response.data});
    console.groupEnd();
  }

  return {};
};
