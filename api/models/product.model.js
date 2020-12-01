const mongoose = require('mongoose');
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const { Schema } = mongoose;

const ProductSchema = new Schema({
  title: { type: String },
  description: { type: String },
  price: { type: String },
  visible: { type: String },
  stock: { type: Number },
  tags: [
    {
      name: { type: String }
    }
  ],
  options: [
    {
      name: { type: String },
      values: [
        {
          name: { type: String },
          stock: { type: Number }
        }
      ]
    }
  ],
  images: [
    {
      url: { type: String },
      key: { type: String }
    }
  ]
});

ProductSchema.index({ '$**': 'text' });
ProductSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Product', ProductSchema);
