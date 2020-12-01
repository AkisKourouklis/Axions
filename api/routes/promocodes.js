const express = require('express');
const httpStatus = require('http-status');
const PromoCode = require('../models/promocode.model');
const utils = require('../utils/utils');
const { verifyTokenMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post('/check/', async (req, res) => {
  const { promoCode, courses } = req.body;
  const foundPromoCode = await PromoCode.findOne({ name: promoCode }).exec();
  if (foundPromoCode) {
    await Promise.all(
      courses.map((course) => {
        if (
          foundPromoCode.appliesOn.includes(course._id) ||
          foundPromoCode.appliesOn.includes('all')
        ) {
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
router.get('/all', [verifyTokenMiddleware], async (req, res) => {
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
          pageCount,
          role: req.tokenDecoded.role
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

// add apply on
router.post(`/new/applyon/:id`, [verifyTokenMiddleware], (req, res) => {
  PromoCode.updateOne(
    { _id: req.params.id },
    {
      $push: {
        appliesOn: req.body.value
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

//remove applyon
router.post(`/remove/applyon/:id`, [verifyTokenMiddleware], (req, res) => {
  PromoCode.updateOne(
    { _id: req.params.id },
    {
      $pull: {
        appliesOn: req.body.value
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

// Get one by id.
router.get('/:id', [verifyTokenMiddleware], (req, res) => {
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
router.get('/:name', [verifyTokenMiddleware], (req, res) => {
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
router.patch('/', [verifyTokenMiddleware], (req, res) => {
  const { _id, name, isPercentage, value } = req.body;

  PromoCode.findByIdAndUpdate(_id, {
    name,
    isPercentage,
    value
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
router.post('/delete/:id', [verifyTokenMiddleware], (req, res) => {
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
