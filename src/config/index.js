import env from 'react-native-config';

const config = {
  api: {
    host: env.API_HOST,
    token: env.TOKEN,
    timeout: 20000,
  },
};

const API_HOST = config.api.host;
const AUTH_TOKEN = config.api.token;

export {API_HOST, AUTH_TOKEN};

export default config;
