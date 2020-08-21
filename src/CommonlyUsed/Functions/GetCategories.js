import axios from 'axios';
import {ResponseHandler} from '../CommunlyUsedFunctions';
import Config from 'react-native-config';

export const GetCategories = async (user_agent) => {
  try {
    const {data} = await axios.get(`${Config.API}/api/categories`, {
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
