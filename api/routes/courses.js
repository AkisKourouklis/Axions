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

const BUCKET_NAME = process.env.BUCKET_NAME;
const REGION = process.env.REGION;
const IAM_USER_KEY = process.env.S3_ACCESS_ID;
const IAM_USER_SECRET = process.env.S3_ACCESS_SECRET;

const s3bucket = new aws.S3({
  accessKeyId: IAM_USER_KEY,
  secretAccessKey: IAM_USER_SECRET,
  Bucket: BUCKET_NAME,
  signatureVersion: 'v4',
  region: REGION
});

// fethc all courses
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
router.get('/all/client', async (req, res) => {
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
router.post('/new', [verifyTokenMiddleware], (req, res) => {
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
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
router.post('/new/client', [verifySubscriberTokenMiddleware], (req, res) => {
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
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Get one by id.
router.get('/:id', (req, res) => {
  const { id } = req.params;
  Course.findById(id)
    .then((course) => {
      res.status(200).json({ course });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Patch: Edit by id
router.patch('/:id', [verifyTokenMiddleware], (req, res) => {
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
    },
    { new: true }
  )
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
router.patch('/:id/client', [verifySubscriberTokenMiddleware], (req, res) => {
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
    },
    { new: true }
  )
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Delete by id
router.post('/delete/:id', [verifyTokenMiddleware], (req, res) => {
  const { id } = req.params;

  Course.findByIdAndDelete(id)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
router.post('/delete/:id/client', [verifySubscriberTokenMiddleware], (req, res) => {
  const { id } = req.params;

  Course.findByIdAndDelete(id)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Fetch multilple course based on id
router.post('/courses', [verifyTokenMiddleware], (req, res) => {
  // post request
  // {
  //   "courses": ["5eb19f2270441521249edad6", "5eb5689bca9b9e078cf51b77"]
  // }

  const data = req.body.courses;
  Course.find({
    _id: {
      $in: data
    }
  })
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
router.post('/courses/client', [verifySubscriberTokenMiddleware], (req, res) => {
  // post request
  // {
  //   "courses": ["5eb19f2270441521249edad6", "5eb5689bca9b9e078cf51b77"]
  // }

  const data = req.body.courses;
  Course.find({
    _id: {
      $in: data
    }
  })
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// upload image text
router.post('/image/:id', [verifyTokenMiddleware], (req, res) => {
  Course.findByIdAndUpdate(
    { _id: req.params.id },
    {
      image: req.body.url
    }
  )
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
router.post('/image/:id/client', [verifySubscriberTokenMiddleware], (req, res) => {
  Course.findByIdAndUpdate(
    { _id: req.params.id },
    {
      image: req.body.url
    }
  )
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
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
router.get('/videos/all', [verifyTokenMiddleware], (req, res) => {
  const params = {
    Bucket: BUCKET_NAME
  };

  s3bucket
    .listObjectsV2(params)
    .then((response) => {
      res.status(200).json(response.Contents);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
router.get('/videos/all/client', [verifySubscriberTokenMiddleware], (req, res) => {
  const params = {
    Bucket: BUCKET_NAME
  };

  s3bucket
    .listObjectsV2(params)
    .then((response) => {
      res.status(200).json(response.Contents);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// upload video text
router.post('/video/:id', [verifyTokenMiddleware], (req, res) => {
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
    }
  )
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
router.post('/video/:id/client', [verifySubscriberTokenMiddleware], (req, res) => {
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
    }
  )
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Patch: Edit video by id
router.patch('/video/:id', [verifyTokenMiddleware], (req, res) => {
  const { title, description, isPreviable, isIntro, _id } = req.body;
  const { id } = req.params;

  Course.updateOne(
    { _id: id, 'videos._id': _id },
    {
      $set: {
        'videos.$.title': title,
        'videos.$.description': description,
        'videos.$.isPreviable': isPreviable,
        'videos.$.isIntro': isIntro
      }
    },
    { new: true }
  )
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// delete s3 video
router.post('/video/delete/:_id', [verifyTokenMiddleware], (req, res) => {
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
      res.status(200).json(err);
    });
});
router.post(
  '/video/delete/:_id/client',
  [verifySubscriberTokenMiddleware],
  (req, res) => {
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
        res.status(200).json(err);
      });
  }
);

// upload to s3
const upload = multer();
router.post(
  '/upload/:key',
  upload.single('file'),
  [verifyTokenMiddleware],
  (req, res) => {
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
