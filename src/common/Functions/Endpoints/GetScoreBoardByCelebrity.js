import { ResponseHandler } from '../ResponseHandler';
import { AUTH_TOKEN, API_HOST } from '../../../config';
import { api } from '../AxiosCacheAdapter';

export const GetScoreBoardByCelebrity = async (user_agent, id, auth_token) => {
  try {
    const { data } = await api.get(`${API_HOST}/api/scoreboard/${id}`, {
      headers: {
        Authorization: `Bearer ${auth_token}`,
        'User-Agent': user_agent,
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    ResponseHandler('GetScoreBoardByCelebrity Response: ', error.response);
    console.group('GetScoreBoardByCelebrity Error ...');
    console.table({ ...error.response.data });
    console.groupEnd();
  }

  return {};
};
