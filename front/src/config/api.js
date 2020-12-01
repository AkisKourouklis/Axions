const axios = require('axios');

const config = {};

config.production = {};
config.production.apiUrl = 'https://api.sovrakofanela.gr';

config.development = {};
config.development.apiUrl = 'http://localhost:4005';

const currentConfig = config[process.env.NODE_ENV];

const axiosCallApi = axios.create({
  baseURL: config[process.env.NODE_ENV].apiUrl,
  timeout: 25000,
  proxyHeaders: false,
  credentials: false,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
});

module.exports = {
  publicApi: currentConfig.apiUrl,
  axiosCallApi
};
