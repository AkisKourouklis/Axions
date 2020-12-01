const path = require('path');

require('dotenv-safe').config({
  path: path.join(__dirname, '../.env'),
  sample: path.join(__dirname, '../.env.example')
});

module.exports = {
  env: process.env.NODE_ENV,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_HOURS,
  jwtUserSecret: process.env.JWT_USER_SECRET,
  jwtSubSecret: process.env.JWT_SUB_SECRET,
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  mongo: {
    uri:
      process.env.NODE_ENV === 'development'
        ? process.env.MONGO_URI
        : process.env.MONGO_URI_PRODUCTION
  },
  port: process.env.PORT,
  url:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://www.axions.co',
  apiUrl:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3002'
      : 'https://api.axions.co'
};
