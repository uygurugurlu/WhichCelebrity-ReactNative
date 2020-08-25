import {ResponseHandler} from './ResponseHandler';
import Config from 'react-native-config';
import {api} from "./AxiosCacheAdapter";
import {TOKEN} from "../Constants";

export const GetCategories = async (user_agent) => {
  try {
    console.log("GetCategories TOKEN: ", Config.TOKEN);

    const {data} = await api.get(`${Config.API}/api/categories`, {
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
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
