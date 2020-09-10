import axios from "axios";
import {API_HOST} from '../../../config';

export const GetToken = async (user_agent) => {

  return axios.post(`${API_HOST}/api/login`,
    {
      "password": "123456",
      "email": "mobile-user@app-fab.com"
    },
    {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        'User-Agent': user_agent,
      },
    });

}
