const express = require('express');
const Config = require('../models/config.model');
const { verifyTokenMiddleware } = require('../middleware/auth');

const router = express.Router();

// get all
router.get('/all/client', (req, res) => {
  Config.find({})
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(200).json(err);
    });
});
router.get('/all', [verifyTokenMiddleware], (req, res) => {
  Config.find({})
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(200).json(err);
    });
});

// add favicon
router.post('/favicon', [verifyTokenMiddleware], (req, res) => {
  const { favicon } = req.body;
  const newConfig = new Config({ favicon });

  newConfig
    .save()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
// edit config
router.patch('/config/:id', [verifyTokenMiddleware], (req, res) => {
  const {
    favicon,
    metatitle,
    metadescription,
    logo,
    adminUrl,
    frontUrl,
    live
  } = req.body;
  if (req.params.id === 'undefined') {
    const newConfig = new Config({
      logo,
      favicon,
      metatitle,
      metadescription,
      adminUrl,
      frontUrl,
      live
    });
    newConfig
      .save()
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } else {
    Config.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          logo,
          favicon,
          metatitle,
          metadescription,
          adminUrl,
          frontUrl,
          live
        }
      },
      { new: true, upsert: false }
    )
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
});

module.exports = router;
