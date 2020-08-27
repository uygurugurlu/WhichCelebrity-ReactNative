import axios from "axios";
import {API_HOST} from '../../config/index';
import {ResponseHandler} from './ResponseHandler';

export const GetToken = async (user_agent) => {
  try {
    const {data} = await axios({
      method: 'post',
      url: `${API_HOST}/api/login`,
      data: {
        "password": "123456",
        "email": "mobile-user@app-fab.com"
      },
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        'User-Agent': user_agent,
      },
    });

    return data;
  } catch (error) {
    ResponseHandler("GetToken Error Response: ", error.response);
    console.group('GetToken Error ...');
    console.table({...error.response.data});
    console.groupEnd();
  }
}
