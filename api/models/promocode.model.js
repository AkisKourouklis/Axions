const mongoose = require('mongoose');
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const { Schema } = mongoose;

const PromoCodeSchema = new Schema({
  name: String,
  isPercentage: Boolean,
  value: Number,
  appliesOn: Array
});

PromoCodeSchema.index({ '$**': 'text' });
PromoCodeSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('PromoCode', PromoCodeSchema);
