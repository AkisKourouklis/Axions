const express = require('express');
const Transaction = require('../models/transactions.model');
const { verifySubscriberTokenMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post('/', [verifySubscriberTokenMiddleware], (req, res) => {
  const { value } = req.body;
  const transaction = new Transaction({
    transaction: { value, date: new Date().getTime() }
  });
  transaction.save((err, doc) => {
    if (err) throw err;
    res.json(doc);
  });
});

router.get('/all', (req, res) => {
  Transaction.find({}, (err, doc) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      res.status(200).json(doc);
    }
  });
});

module.exports = router;
