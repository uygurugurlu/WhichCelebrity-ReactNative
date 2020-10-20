import { ResponseHandler } from '../ResponseHandler';
import { AUTH_TOKEN, API_HOST } from '../../../config';
import { api } from '../AxiosCacheAdapter';

export const GetScoreBoard = async (user_agent, auth_token) => {
  try {
    const { data } = await api.get(`${API_HOST}/api/scoreboard/`, {
      headers: {
        Authorization: `Bearer ${auth_token}`,
        'User-Agent': user_agent,
      },
    });
    console.log('top10 data: ', data);
    return data;
  } catch (error) {
    ResponseHandler('GetScoreBoard Response: ', error.response);
    console.group('GetScoreBoard Error ...');
    console.table({ ...error.response.data });
    console.groupEnd();
  }

  return {};
};
