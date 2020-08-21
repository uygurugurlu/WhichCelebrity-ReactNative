import axios from 'axios';
import {ResponseHandler} from '../CommunlyUsedFunctions';
import Config from 'react-native-config';

export const GetCelebrities = async (user_agent) => {
  try {
    const {data} = await axios.get(`${Config.API}/api/celebrities`, {
      headers: {
        'Authorization': `Bearer ${Config.TOKEN}`,
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
