import env from 'react-native-config';
import AsyncStorage from '@react-native-community/async-storage';
import {getData} from '../../src/common/Functions/ManageAsyncData.js'
const config = {
  api: {
    host: env.API_HOST,
    token: env.TOKEN,
    timeout: 20000,
  },
};
const API_HOST = config.api.host;

const getAuthToken =  () => {
  AsyncStorage.getItem('@auth_token').then((res) => {

    if(res !== null ){
      return res;
    }
    else {
      return config.api.token;
    };
  })
  return config.api.token;
}
const AUTH_TOKEN = getAuthToken();
export default config;

export {API_HOST, AUTH_TOKEN};
