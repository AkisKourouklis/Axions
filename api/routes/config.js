const express = require('express');
const Config = require('../models/config.model');
const {
  verifyTokenMiddleware,
  verifySubscriberTokenMiddleware
} = require('../middleware/auth');

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
router.get('/all', (req, res) => {
  Config.find({})
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(200).json(err);
    });
});

// add favicon
router.post('/favicon', (req, res) => {
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
// edit favicon
router.patch('/config/:id', (req, res) => {
  const { favicon, metatitle, metadescription, logo } = req.body;
  if (req.params.id === 'undefined') {
    const newConfig = new Config({ logo, favicon, metatitle, metadescription });
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
          metadescription
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
