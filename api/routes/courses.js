const express = require('express');
const httpStatus = require('http-status');
const aws = require('aws-sdk');
const {
  verifySubscriberTokenMiddleware,
  verifyTokenMiddleware
} = require('../middleware/auth');
const Course = require('../models/course.model');
const utils = require('../utils/utils');
const multer = require('multer');

const router = express.Router();

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

// Get all
router.get('/all', async (req, res) => {
  const { orderby, filter, skip, sort, perPage } = req.query;
  try {
    const aggregate = Course.aggregate();
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
              description: {
                $regex: new RegExp(utils.transliterate(f), 'i')
              }
            },
            {
              price: {
                $regex: new RegExp(utils.transliterate(f), 'i')
              }
            },
            {
              discount: {
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

    return Course.aggregatePaginate(
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
          courses: results,
          pageCount,
          skip
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR);
    return res.json();
  }
});

// Create new
router.post('/new', (req, res) => {
  const {
    name,
    price,
    description,
    isFeatured,
    visible,
    discount,
    videos,
    image,
    options
  } = req.body;

  const newCourse = new Course({
    name,
    price,
    description,
    isFeatured,
    visible,
    discount,
    videos,
    image,
    options
  });
  newCourse
    .save()
    .then((doc) => {
      res.status(httpStatus.OK);
      return res.json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR);
      return res.json();
    });
});

// Get one by id.
router.get('/:id', (req, res) => {
  const { id } = req.params;
  Course.findById(id)
    .then((course) => {
      res.status(httpStatus.OK);
      return res.json({ course });
    })
    .catch((err) => {
      console.log(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR);
      return res.json();
    });
});

// Patch: Edit by id
router.patch('/:id', (req, res) => {
  const {
    name,
    price,
    description,
    isFeatured,
    visible,
    discount,
    data,
    options,
    image
  } = req.body;
  const { id } = req.params;

  Course.findByIdAndUpdate(
    { _id: id },
    {
      name,
      price,
      description,
      isFeatured,
      visible,
      discount,
      data,
      options,
      image
    }
  )
    .then(() => {
      res.status(httpStatus.OK);
      return res.json(httpStatus.OK);
    })
    .catch((err) => {
      console.log(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR);
      return res.json(httpStatus.INTERNAL_SERVER_ERROR);
    });
});

// Delete by id
router.post('/delete/:id', (req, res) => {
  const { id } = req.params;

  Course.findByIdAndDelete(id)
    .then(() => {
      res.status(httpStatus.OK);
      return res.json();
    })
    .catch((err) => {
      console.log(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR);
      return res.json();
    });
});

// Fetch multilple course based on id
router.post('/courses', (req, res) => {
  // post request
  // {
  //   "courses": ["5eb19f2270441521249edad6", "5eb5689bca9b9e078cf51b77"]
  // }

  const data = req.body.courses;
  Course.find(
    {
      _id: {
        $in: data
      }
    },
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
// Fetch multilple course based on id
router.post('/courses/client', [verifySubscriberTokenMiddleware], (req, res) => {
  // post request
  // {
  //   "courses": ["5eb19f2270441521249edad6", "5eb5689bca9b9e078cf51b77"]
  // }

  const data = req.body.courses;
  Course.find(
    {
      _id: {
        $in: data
      }
    },
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

// upload image text
router.post('/image/:id', (req, res) => {
  Course.findByIdAndUpdate(
    { _id: req.params.id },
    {
      image: req.body.url
    },
    (error, response) => {
      if (error) throw error;
      res.json(response);
      const params = {
        Bucket: BUCKET_NAME,
        Key: req.body.key
      };
      s3bucket.deleteObject(params, (err, data) => {
        if (err) {
          res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json(httpStatus.INTERNAL_SERVER_ERROR);
        }
        res.status(httpStatus.OK).json(data);
      });
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
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
    res.status(httpStatus.OK).json(data);
  });
});

// get s3 all videos
router.get('/videos/all', (req, res) => {
  const params = {
    Bucket: BUCKET_NAME
  };

  s3bucket.listObjectsV2(params, (err, data) => {
    if (err) {
      console.log(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
    res.status(httpStatus.OK).json(data.Contents);
  });
});

// upload video text
router.post('/video/:id', (req, res) => {
  Course.updateOne(
    { _id: req.params.id },
    {
      $push: {
        videos: {
          title: req.body.title,
          description: req.body.description,
          isIntro: req.body.isIntro,
          url: req.body.url,
          key: req.body.key,
          isPreviable: req.body.isPreviable
        }
      }
    },
    (error, response) => {
      if (error) throw error;
      res.json(response);
    }
  );
});

// Patch: Edit video by id
router.patch('/video/:id', (req, res) => {
  const { title, description, isPreviable, isIntro, _id, url, key } = req.body;
  const { id } = req.params;

  Course.findByIdAndUpdate(
    { _id: id, 'videos._id': _id },
    {
      $set: {
        videos: {
          title,
          description,
          isPreviable,
          isIntro,
          url,
          key
        }
      }
    },
    { new: true, upsert: false }
  )
    .then((response) => {
      res.status(httpStatus.OK);
      return res.json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR);
      return res.json(httpStatus.INTERNAL_SERVER_ERROR);
    });
});

// delete s3 video
router.post('/video/delete/:_id', (req, res) => {
  const { _id } = req.params;
  const { id, key } = req.body;
  const params = {
    Bucket: BUCKET_NAME,
    Key: key
  };
  console.log(id, key);

  Course.updateOne({ _id: id }, { $pull: { videos: { _id } } }, { new: true })
    .then(() =>
      s3bucket.deleteObject(params, (err) => {
        if (err) {
          console.log(err);
          res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json(httpStatus.INTERNAL_SERVER_ERROR);
        } else {
          res.status(httpStatus.OK).json('Deleted Successfully');
        }
      })
    )
    .catch((err) => {
      console.log(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR);
      return res.json(httpStatus.INTERNAL_SERVER_ERROR);
    });
});

// upload to s3
const upload = multer();
router.post(
  '/upload/:key',
  upload.single('file'),
  [verifyTokenMiddleware],
  (req, res) => {
    console.log(req.file);
    const params = {
      Bucket: BUCKET_NAME,
      Key: req.params.key,
      Body: req.file.buffer
    };
    s3bucket.upload(params, (err, data) => {
      if (err) {
        console.log(err);
        res.json(err);
      }
      console.log(`File uploaded successfully. ${JSON.stringify(data.Location)}`);
      res.json(data.Location);
    });
  }
);

module.exports = router;
