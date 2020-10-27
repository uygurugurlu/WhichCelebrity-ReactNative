import { API_HOST } from '../../../config';
import { api } from '../AxiosCacheAdapter';

export const DeviceTokenWithBearer = async (auth_token, device_id, device_token) => {
  let body = '';
  body = {
    device_id: device_id,
    device_token: device_token,
  };

  return api.post(`${API_HOST}/api/device-token`, body, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    }
  });
};
