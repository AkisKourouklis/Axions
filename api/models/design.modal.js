const mongoose = require('mongoose');
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const { Schema } = mongoose;

const DesignSchema = new Schema({
  navbar: {
    searchType: { type: String, default: 'product' }
  }
});

DesignSchema.index({ '$**': 'text' });
DesignSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Design', DesignSchema);
