const mongoose = require('mongoose');
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const { Schema } = mongoose;

// isPreviable is if you can view the video without purchasing it
// isIntro is if the video is displayed on front product page

const CourseSchema = new Schema({
  name: { type: String },
  price: { type: Number },
  description: { type: String },
  subhead: { type: String },
  featured: { type: Boolean },
  visible: { type: Boolean },
  discount: { value: { type: Number }, discountType: { type: String } },
  image: String,
  options: [
    {
      name: String
    }
  ],
  videos: [
    {
      title: String,
      url: String,
      description: String,
      isPreviable: Boolean,
      isIntro: Boolean,
      key: String
    }
  ]
});

CourseSchema.index({ '$**': 'text' });
CourseSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Course', CourseSchema);
