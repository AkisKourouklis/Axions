const express = require('express');
const Filter = require('../models/filters.model');
const { verifyTokenMiddleware } = require('../middleware/auth');
const httpStatus = require('http-status');
const utils = require('../utils/utils');

const router = express.Router();

// fetch all categories
router.get('/all', async (req, res) => {
  const { orderby, filter, skip, sort, perPage } = req.query;
  try {
    const aggregate = Filter.aggregate();
    const match = { $and: [] };

    if (filter) {
      await filter.split(' ').forEach((f) => {
        match.$and.push({
          $or: [
            {
              name: {
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

    return Filter.aggregatePaginate(
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
          filters: results,
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

// fetch single Filter
router.get('/:id', [verifyTokenMiddleware], (req, res) => {
  Filter.findById({ _id: req.params.id }, (err, doc) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(doc);
    }
  });
});

// fetch single Filter by name
router.patch('/:name', (req, res) => {
  const { name } = req.params;
  Filter.findOne({ name }, (err, doc) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(doc);
    }
  });
});

// create new filter
router.post('/new', [verifyTokenMiddleware], (req, res) => {
  const { name, options } = req.body;

  const newFilter = new Filter({ name, options });
  newFilter.save((err, doc) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(doc);
    }
  });
});

//add Filter option
router.patch('/option/:id', [verifyTokenMiddleware], (req, res) => {
  const { option } = req.body;
  const { id } = req.params;

  Filter.updateOne(
    { _id: id },
    {
      $push: {
        options: {
          name: option
        }
      }
    }
  )
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// remove Filter option
router.patch('/option/remove/:id', [verifyTokenMiddleware], (req, res) => {
  const { _id } = req.body;
  const { id } = req.params;

  Filter.updateOne(
    { _id: id },
    {
      $pull: {
        options: {
          _id
        }
      }
    }
  )
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//edit Filter
router.patch('/filter/:id', [verifyTokenMiddleware], (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  Filter.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        name
      }
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

//delete Filter
router.delete('/:id', [verifyTokenMiddleware], (req, res) => {
  const { id } = req.params;

  Filter.findByIdAndDelete({ _id: id }, (err, doc) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(doc);
    }
  });
});
module.exports = router;
