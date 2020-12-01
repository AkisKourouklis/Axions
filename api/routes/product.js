const express = require('express');
const Products = require('../models/product.model');
const httpStatus = require('http-status');
const utils = require('../utils/utils');
const {
  verifySubscriberTokenMiddleware,
  verifyTokenMiddleware
} = require('../middleware/auth');

const router = express.Router();

//add option to products
router.patch('/option/:id', [verifyTokenMiddleware], (req, res) => {
  // values will be like
  // values: [{
  //   name: string,
  //   stock: number
  // }]

  Products.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $push: {
        options: {
          name: req.body.name
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
//remove option
router.patch('/option/remove/:_id', [verifyTokenMiddleware], (req, res) => {
  const { _id } = req.params;
  const { id } = req.body;
  Products.findByIdAndUpdate({ _id: id }, { $pull: { options: { _id } } }, { new: true })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
//product add option value
router.patch('/option/values/:id', [verifyTokenMiddleware], (req, res) => {
  Products.updateOne(
    { _id: req.params.id, 'options._id': req.body.id },
    {
      $push: {
        'options.$.values': {
          name: req.body.name,
          stock: req.body.stock
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
//product remove option values
router.patch('/option/values/remove/:id', [verifyTokenMiddleware], (req, res) => {
  Products.updateOne(
    { _id: req.params.id, 'options._id': req.body.id },
    {
      $pull: {
        'options.$.values': {
          _id: req.body._id
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

//add tag to product
router.post('/tag/:id', [verifyTokenMiddleware], (req, res) => {
  Products.updateOne(
    { _id: req.params.id },
    {
      $push: {
        tags: {
          name: req.body.tag
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
//remove tag from product
router.post('/tag/remove/:_id', [verifyTokenMiddleware], (req, res) => {
  const { _id } = req.params;
  const { id } = req.body;
  Products.updateOne({ _id: id }, { $pull: { tags: { _id } } }, { new: true })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// fetch all products
router.get('/all', async (req, res) => {
  const {
    orderby,
    filter,
    filter2,
    filter3,
    filter4,
    filter5,
    skip,
    sort,
    perPage
  } = req.query;
  try {
    const aggregate = Products.aggregate();
    const match = { $and: [] };

    if (filter) {
      await filter.split(' ').forEach((f) => {
        match.$and.push({
          $or: [
            {
              title: {
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
              'tags.name': {
                $regex: new RegExp(utils.transliterate(f), 'i')
              }
            }
          ]
        });
      });
      aggregate.match(match);
    }
    if (filter2) {
      await filter2.split(' ').forEach((f) => {
        match.$and.push({
          $or: [
            {
              'tags.name': {
                $regex: new RegExp(utils.transliterate(f), 'i')
              }
            }
          ]
        });
      });
      aggregate.match(match);
    }
    if (filter3) {
      await filter3.split(' ').forEach((f) => {
        match.$and.push({
          $or: [
            {
              'tags.name': {
                $regex: new RegExp(utils.transliterate(f), 'i')
              }
            }
          ]
        });
      });
      aggregate.match(match);
    }
    if (filter4) {
      await filter4.split(' ').forEach((f) => {
        match.$and.push({
          $or: [
            {
              'tags.name': {
                $regex: new RegExp(utils.transliterate(f), 'i')
              }
            }
          ]
        });
      });
      aggregate.match(match);
    }
    if (filter5) {
      await filter5.split(' ').forEach((f) => {
        match.$and.push({
          $or: [
            {
              'tags.name': {
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

    return Products.aggregatePaginate(
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
          products: results,
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
  const { title, price, description, visible, images, stock } = req.body;

  const newProduct = new Products({
    title,
    price,
    description,
    visible,
    images,
    stock
  });
  newProduct
    .save()
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// product add image
router.patch('/image/:id', [verifyTokenMiddleware], (req, res) => {
  const { key, url } = req.body;
  const { id } = req.params;

  Products.updateOne(
    { _id: id },
    {
      $push: {
        images: {
          key,
          url
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
// product remove image
router.post('/image/remove/:key', [verifyTokenMiddleware], (req, res) => {
  const { key } = req.params;
  const { id } = req.body;
  Products.updateOne({ _id: id }, { $pull: { images: { key } } }, { new: true })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Get one by id.
router.get('/:id', (req, res) => {
  const { id } = req.params;
  Products.findById(id)
    .then((product) => {
      res.status(200).json({ product });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Patch: Edit by id
router.patch('/:id', [verifyTokenMiddleware], (req, res) => {
  const { title, price, description, visible, stock } = req.body;
  const { id } = req.params;

  Products.findByIdAndUpdate(
    { _id: id },
    {
      title,
      price,
      description,
      visible,
      stock
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

  Products.findByIdAndDelete(id)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Fetch multilple products based on id
router.post('/products', [verifyTokenMiddleware], (req, res) => {
  // post request
  // {
  //   "courses": ["5eb19f2270441521249edad6", "5eb5689bca9b9e078cf51b77"]
  // }

  const data = req.body.products;
  Products.find({
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
router.post('/products/client', [verifySubscriberTokenMiddleware], (req, res) => {
  // post request
  // {
  //   "courses": ["5eb19f2270441521249edad6", "5eb5689bca9b9e078cf51b77"]
  // }

  const data = req.body.products;
  Products.find({
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
  Products.findByIdAndUpdate(
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

// upload image text
router.post('/image/:id', [verifyTokenMiddleware], (req, res) => {
  Products.updateOne(
    { _id: req.params.id },
    {
      $push: {
        images: {
          url: req.body.url,
          key: req.body.key
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

module.exports = router;
