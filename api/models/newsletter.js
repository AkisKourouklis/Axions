const mongoose = require('mongoose');
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const { Schema } = mongoose;

const PromoCodeSchema = new Schema({
  email: String
});

PromoCodeSchema.index({ '$**': 'text' });
PromoCodeSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Newsletter', PromoCodeSchema);
