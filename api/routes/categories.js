const express = require('express');
const Category = require('../models/categories.model');
const { verifyTokenMiddleware } = require('../middleware/auth');
const httpStatus = require('http-status');
const utils = require('../utils/utils');

const router = express.Router();

// fetch all categories
router.get('/all', async (req, res) => {
  const { orderby, filter, skip, sort, perPage } = req.query;
  try {
    const aggregate = Category.aggregate();
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

    return Category.aggregatePaginate(
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
          categories: results,
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

// fetch single category
router.get('/:id', [verifyTokenMiddleware], (req, res) => {
  Category.findById({ _id: req.params.id }, (err, doc) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(doc);
    }
  });
});

// fetch single category by name
router.patch('/:name', (req, res) => {
  const { name } = req.params;
  Category.findOne({ name }, (err, doc) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(doc);
    }
  });
});

// create new catogory
router.post('/new', [verifyTokenMiddleware], (req, res) => {
  const { name, options, image } = req.body;

  const newCategory = new Category({ name, options, image });
  newCategory.save((err, doc) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(doc);
    }
  });
});

//add category option
router.patch('/option/:id', [verifyTokenMiddleware], (req, res) => {
  const { option } = req.body;
  const { id } = req.params;

  Category.updateOne(
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

// remove category option
router.patch('/option/remove/:id', [verifyTokenMiddleware], (req, res) => {
  const { _id } = req.body;
  const { id } = req.params;

  Category.updateOne(
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

//edit category
router.patch('/category/:id', [verifyTokenMiddleware], (req, res) => {
  const { name, image, order } = req.body;
  const { id } = req.params;

  console.log(image);

  if (image) {
    Category.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          name,
          image
        },
        $position: order
      },
      { new: true }
    )
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } else {
    Category.findByIdAndUpdate(
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
  }
});

//delete Category
router.delete('/:id', [verifyTokenMiddleware], (req, res) => {
  const { id } = req.params;

  Category.findByIdAndDelete({ _id: id }, (err, doc) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(doc);
    }
  });
});

// product remove image
router.post('/image/remove/:key', [verifyTokenMiddleware], (req, res) => {
  const { key } = req.params;
  const { id } = req.body;
  Category.updateOne({ _id: id }, { $pull: { image: { key } } }, { new: true })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
