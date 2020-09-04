import {ResponseHandler} from '../ResponseHandler';
import {AUTH_TOKEN, API_HOST} from '../../../config';
import {api} from "../AxiosCacheAdapter";

export const GetCategories = async (user_agent, locale) => {

  try {
    const {data, headers} = await api.get(`${API_HOST}/api/categories?locale=${locale}`, {
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
