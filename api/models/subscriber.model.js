const mongoose = require('mongoose');
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const { Schema } = mongoose;
const SubscriberSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }]
});

SubscriberSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Subscriber', SubscriberSchema);
