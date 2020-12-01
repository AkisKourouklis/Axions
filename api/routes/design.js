const express = require('express');
const router = express.Router();
const Design = require('../models/design.modal');
const { verifyTokenMiddleware } = require('../middleware/auth');

// find all
router.get('/', (req, res) => {
  Design.find({}, (err, doc) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(doc);
    }
  });
});

// update || create search type
router.patch('/navbar/searchType', [verifyTokenMiddleware], (req, res) => {
  const { searchType, id } = req.body;

  if (id) {
    Design.updateOne(
      { _id: id },
      {
        'navbar.searchType': searchType
      },
      (err, doc) => {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(doc);
        }
      }
    );
  } else {
    const newDesign = new Design({ 'navbar.searchType': searchType });
    newDesign.save((err, doc) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(doc);
      }
    });
  }
});

module.exports = router;
