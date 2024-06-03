const config = {
  email: process.env.REACT_APP_EMAIL,
  username: process.env.REACT_APP_USERNAME,
  password: process.env.REACT_APP_PASSWORD,
  devUrl: process.env.REACT_APP_DEV_URL,
  devUrlApi: process.env.REACT_APP_DEV_URL_API,
  prodUrl: process.env.REACT_APP_PROD_URL,
  prodApiVersion: process.env.REACT_APP_PROD_API_VERSION,
  devWsUrl: process.env.REACT_APP_DEV_WS_SERVICE_URL,
  prodWsUrl: process.env.REACT_APP_PROD_WS_SERVICE_URL,
};

export default config;
