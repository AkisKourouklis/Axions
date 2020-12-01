const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const vars = require('../config/vars');

const jwtAuthentication = {};

jwtAuthentication.createUserSign = (user) =>
  new Promise((resolve, reject) => {
    const jwtOptions = {
      expiresIn: vars.jwtExpirationInterval
    };
    jwt.sign(user, vars.jwtUserSecret, jwtOptions, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });

jwtAuthentication.createSubSign = (user) =>
  new Promise((resolve, reject) => {
    console.log(vars);
    const jwtOptions = {
      expiresIn: vars.jwtExpirationInterval
    };
    jwt.sign(user, vars.jwtSubSecret, jwtOptions, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });

jwtAuthentication.verifyTokenMiddleware = (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    const splitedAuthorization = req.headers.authorization.split(' ');
    if (splitedAuthorization.length === 2) {
      // eslint-disable-next-line
      token = splitedAuthorization[1];
    }
  } else token = '';

  jwt.verify(token, vars.jwtUserSecret, (err, decoded) => {
    if (err) {
      res.status(httpStatus.UNAUTHORIZED);
      return res.send({
        message: 'Δεν έχετε δικαίωμα πρόσβασης'
      });
    }
    req.tokenDecoded = decoded;
    res.id = decoded.id;
    return next();
  });
};

jwtAuthentication.verifySubscriberTokenMiddleware = (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    const splitedAuthorization = req.headers.authorization.split(' ');
    if (splitedAuthorization.length === 2) {
      // eslint-disable-next-line
      token = splitedAuthorization[1];
    }
  } else token = '';

  jwt.verify(token, vars.jwtSubSecret, (err, decoded) => {
    if (err) {
      res.status(httpStatus.UNAUTHORIZED);
      return res.send({
        message: 'Δεν έχετε δικαίωμα πρόσβασης'
      });
    }
    req.tokenDecoded = decoded;
    res.id = decoded.id;
    return next();
  });
};

module.exports = jwtAuthentication;
