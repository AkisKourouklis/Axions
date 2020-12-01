const express = require('express');
const httpStatus = require('http-status');
const PromoCode = require('../models/promocode.model');
const utils = require('../utils/utils');
const {
  verifyTokenMiddleware,
  verifySubscriberTokenMiddleware
} = require('../middleware/auth');

const router = express.Router();

router.post('/check/', async (req, res) => {
  const { promoCode, courses } = req.body;
  const foundPromoCode = await PromoCode.findOne({ name: promoCode }).exec();
  if (foundPromoCode) {
    await Promise.all(
      courses.map((course) => {
        if (foundPromoCode.appliesOn.includes(course._id)) {
          course.promoCodePrice =
            Math.floor(
              (foundPromoCode.isPercentage
                ? course.price - course.price * (foundPromoCode.value / 100)
                : course.price - foundPromoCode.value) * 100
            ) / 100;
        }
        return null;
      })
    );
  }
  res.status(httpStatus.OK);
  return res.json({ courses, isValid: !!foundPromoCode });
});

// Get all
router.get('/all', async (req, res) => {
  const { orderby, filter, skip, sort, perPage } = req.query;
  try {
    const aggregate = PromoCode.aggregate();
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
              value: {
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

    return PromoCode.aggregatePaginate(
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
          promoCodes: results,
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

// Create new
router.post('/new', (req, res) => {
  const { name, isPercentage, value, appliesOn } = req.body;

  const newPromoCode = new PromoCode({
    name,
    isPercentage,
    value,
    appliesOn
  });
  newPromoCode
    .save()
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

// Get one by id.
router.get('/:id', (req, res) => {
  const { id } = req.params;
  PromoCode.findById(id)
    .then((promoCode) => {
      res.status(httpStatus.OK);
      return res.json({ promoCode });
    })
    .catch((err) => {
      console.log(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR);
      return res.json();
    });
});

// Get one by name.
router.get('/:name', (req, res) => {
  const { name } = req.params;
  PromoCode.findOne({ name })
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
router.patch('/', (req, res) => {
  const { _id, name, isPercentage, value, appliesOn } = req.body;

  PromoCode.findByIdAndUpdate(_id, {
    name,
    isPercentage,
    value,
    appliesOn
  })
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

// Delete by id
router.post('/delete/:id', (req, res) => {
  const { id } = req.params;

  PromoCode.findByIdAndDelete(id)
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

module.exports = router;
