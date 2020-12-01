const express = require('express'),
  bcrypt = require('bcryptjs'),
  httpStatus = require('http-status'),
  jwt = require('jsonwebtoken'),
  router = express.Router(),
  User = require('../models/user.model'),
  jwtAuthentication = require('../middleware/auth');

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  let loadedUser;
  User.findOne({
    email
  })
    .then((user) => {
      // check if email exists
      if (!user) {
        res.status(httpStatus.UNAUTHORIZED);
        return res.json({ err: 'user not found' });
      }
      loadedUser = user;
      return bcrypt.compare(password, loadedUser.password);
    })
    .then((isEqual) => {
      if (loadedUser) {
        // check if password match
        if (!isEqual) {
          res.status(httpStatus.UNAUTHORIZED);
          return res.json({ err: 'passwords dont match' });
        }
        // create token
        const jwtUserData = {
          email: loadedUser.email,
          id: loadedUser._id,
          language: loadedUser.language,
          name: loadedUser.name
        };
        return jwtAuthentication.createUserSign(jwtUserData);
      }
      return null;
    })
    .then((token) => {
      if (loadedUser) {
        const decoded = jwt.decode(token);
        res.status(httpStatus.OK);
        return res.json({
          email: loadedUser.email,
          expirationDate: decoded.exp,
          id: loadedUser._id,
          language: loadedUser.language,
          name: loadedUser.name,
          token
        });
      }
      return null;
    })
    .catch((err) => {
      console.log(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR);
      return res.json();
    });
});

// register
router.post('/register', async (req, res) => {
  const data = req.body;
  const foundUser = await User.find({ email: data.email }).exec();
  if (foundUser.length > 0) {
    res.status(httpStatus.UNAUTHORIZED);
    return res.json();
  }
  bcrypt
    .hash(data.password, 12)
    .then((hashedPassword) => {
      const user = new User({
        email: data.email,
        password: hashedPassword,
        name: data.name,
        language: data.language
      });
      return user.save();
    })
    .then((newUser) => {
      res.status(httpStatus.OK);
      return res.json({
        newUser,
        message: 'Registered successfully'
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR);
      return res.json();
    });
  return null;
});

// get user by email
router.get('/:email', (req, res) => {
  User.findOne({ email: req.params.email }, (err, doc) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      res.status(200).json(doc);
    }
  });
});

module.exports = router;
