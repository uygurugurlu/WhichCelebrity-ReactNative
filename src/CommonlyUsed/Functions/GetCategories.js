import {ResponseHandler} from './ResponseHandler';
import {AUTH_TOKEN, API_HOST} from '../../config/index';
import {api} from "./AxiosCacheAdapter";

export const GetCategories = async (user_agent) => {

  console.log("AUTH_TOKEN: ", AUTH_TOKEN);
  console.log("API_HOST: ", API_HOST);

  try {
    const {data, headers} = await api.get(`${API_HOST}/api/categories`, {
      headers: {
        'Authorization': `Bearer ${AUTH_TOKEN}`,
        'User-Agent': user_agent,
      }
    });

    console.log("headers: ", headers);
    return data;
  } catch (error) {
    ResponseHandler('GetCategories Response: ', error.response);
    console.group('GetCategories Error ...');
    console.table({...error.response.data});
    console.groupEnd();
  }

  return {};
};
