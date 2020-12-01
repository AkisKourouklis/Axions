const mongoose = require('mongoose');
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const { Schema } = mongoose;

const CategoriesSchema = new Schema({
  name: { type: String },
  options: [{ name: { type: String } }],
  image: { type: String }
});

CategoriesSchema.index({ '$**': 'text' });
CategoriesSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('categorie', CategoriesSchema);
