const express = require('express'),
  bcrypt = require('bcryptjs'),
  httpStatus = require('http-status'),
  jwt = require('jsonwebtoken'),
  router = express.Router(),
  nodemailer = require('nodemailer'),
  aws = require('aws-sdk'),
  Subscriber = require('../models/subscriber.model'),
  {
    verifyTokenMiddleware,
    verifySubscriberTokenMiddleware
  } = require('../middleware/auth'),
  utils = require('../utils/utils'),
  jwtAuthentication = require('../middleware/auth');

const BUCKET_NAME = 'becomethevulture';
const IAM_USER_KEY = process.env.S3_ACCESS_ID;
const IAM_USER_SECRET = process.env.S3_ACCESS_SECRET;

const s3bucket = new aws.S3({
  accessKeyId: IAM_USER_KEY,
  secretAccessKey: IAM_USER_SECRET,
  Bucket: BUCKET_NAME,
  signatureVersion: 'v4',
  region: 'eu-central-1'
});

// get all
router.get('/all', async (req, res) => {
  const { orderby, filter, skip, sort, perPage } = req.query;
  try {
    const aggregate = Subscriber.aggregate();
    const match = { $and: [] };

    if (filter) {
      await filter.split(' ').forEach((f) => {
        match.$and.push({
          $or: [
            {
              name: {
                $regex: new RegExp(utils.transliterate(f), 'i')
              }
            },
            {
              email: {
                $regex: new RegExp(utils.transliterate(f), 'i')
              }
            }
          ]
        });
      });
      aggregate.match(match);
    }

    const options = {
      allowDiskUse: true,
      limit: perPage,
      page: skip,
      sortBy: { [orderby]: sort }
    };

    return Subscriber.aggregatePaginate(
      aggregate,
      options,
      (err, results, pageCount, count) => {
        if (err) {
          console.log(err);
          res.status(httpStatus.INTERNAL_SERVER_ERROR);
          return res.json();
        }
        res.status(httpStatus.OK);
        return res.json({
          count,
          subscribers: results,
          pageCount
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR);
    return res.json();
  }
});

// ge by id
router.get('/:id', (req, res) => {
  Subscriber.findById({ _id: req.params.id }, (err, doc) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      res.status(200).json(doc);
    }
  });
});
router.get('/client/:id', [verifySubscriberTokenMiddleware], (req, res) => {
  Subscriber.findById({ _id: req.params.id }, (err, doc) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      res.status(200).json(doc);
    }
  });
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  let loadedUser;
  Subscriber.findOne({
    email
  })
    .then((user) => {
      // check if email exists
      if (!user) {
        res.status(httpStatus.UNAUTHORIZED);
        return res.json();
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      // check if password match
      if (!isEqual) {
        res.status(httpStatus.UNAUTHORIZED);
        return res.json();
      }
      // create token
      const jwtUserData = {
        email: loadedUser.email,
        id: loadedUser._id,
        language: loadedUser.language,
        name: loadedUser.name
      };
      return jwtAuthentication.createSubSign(jwtUserData);
    })
    .then((token) => {
      const decoded = jwt.decode(token);
      res.status(httpStatus.OK);
      return res.json({
        email: loadedUser.email,
        expirationDate: decoded.exp,
        id: loadedUser._id,
        language: loadedUser.language,
        name: loadedUser.name,
        courses: loadedUser.courses,
        token
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR);
      return res.json();
    });
});

//  register
router.post('/register', async (req, res) => {
  const data = req.body;
  const sub = await Subscriber.find({ email: data.email }).exec();
  if (sub.length > 0) {
    res.status(httpStatus.UNAUTHORIZED);
    return res.json();
  }
  bcrypt
    .hash(data.password, 12)
    .then((hashedPassword) => {
      const user = new Subscriber({
        email: data.email,
        password: hashedPassword,
        name: data.name,
        language: data.language,
        phone: data.phone
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

// edit subscriber
router.patch('/:id', (req, res) => {
  Subscriber.findByIdAndUpdate(
    { _id: req.params.id },
    { name: req.body.name, email: req.body.email, language: req.body.language },
    (err, doc) => {
      if (err) {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR);
      } else {
        res.status(200).json(doc);
      }
    }
  );
});

// add course
router.post('/addCourse', (req, res) => {
  const { id, course } = req.body;

  Subscriber.findByIdAndUpdate(
    { _id: id },
    { $push: { courses: course } },
    (err, doc) => {
      if (err) {
        console.log(err);
        res.status(500).json(httpStatus.INTERNAL_SERVER_ERROR);
      } else {
        res.status(200).json(doc);
      }
    }
  );
});
router.post('/addCourse/client', [verifySubscriberTokenMiddleware], (req, res) => {
  const { id, course } = req.body;

  Subscriber.findByIdAndUpdate(
    { _id: id },
    { $push: { courses: course } },
    (err, doc) => {
      if (err) {
        console.log(err);
        res.status(500).json(httpStatus.INTERNAL_SERVER_ERROR);
      } else {
        res.status(200).json(doc);
      }
    }
  );
});

// remove course
router.post('/removeCourse', (req, res) => {
  const { id, course } = req.body;

  Subscriber.findByIdAndUpdate(
    { _id: id },
    { $pull: { courses: course } },
    (err, doc) => {
      if (err) {
        console.log(err);
        res.status(500).json(httpStatus.INTERNAL_SERVER_ERROR);
      } else {
        res.status(200).json(doc);
      }
    }
  );
});

// get s3 file
router.post('/s3/single', (req, res) => {
  const { file } = req.body;

  const params = {
    Bucket: BUCKET_NAME,
    Key: file
  };

  s3bucket.getSignedUrl('getObject', params, (err, data) => {
    if (err) {
      console.log(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
    res.status(httpStatus.OK).json(data);
  });
});

//  forgot password
router.post('/forgot-password', (req, res) => {
  const { email } = req.body;

  Subscriber.findOne({ email }, (err, doc) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    }
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL, // TODO: your gmail account
        pass: process.env.EMAIL_PASSWORD // TODO: your gmail password
      }
    });

    const mailOptions = {
      from: process.env.EMAIL, // TODO: email sender
      to: email, // TODO: email receiver
      subject: 'Vulture - Άλλαξε τον κωδικό σου',
      html: `<p>Reset Password link <a href='https://www.becomethevulture.com/password/reset?id=${doc._id}'>Click me</a></p>`,
      context: {
        name: 'George Koutroulis'
      }
    };

    transporter.sendMail(mailOptions, (error, data) => {
      if (error) {
        res.status(500).json(error);
      }
      res.status(200).json(data);
    });
  });
});

router.post('/reset-password/:id', (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      Subscriber.findByIdAndUpdate(
        { _id: id },
        { password: hashedPassword },
        (err, doc) => {
          if (err) {
            console.log(err);
            res.status(err);
          } else {
            res.status(200).json(doc);
          }
        }
      );
    })
    .catch((err) => {
      console.log(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR);
      return res.json();
    });
});

module.exports = router;
