const mongoose = require('mongoose');
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const { Schema } = mongoose;

const FiltersSchema = new Schema({
  name: { type: String },
  options: [{ name: { type: String } }]
});

FiltersSchema.index({ '$**': 'text' });
FiltersSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('filter', FiltersSchema);
