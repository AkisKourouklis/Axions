const mongoose = require('mongoose');

const { Schema } = mongoose;

const ConfigSchema = new Schema({
  favicon: { type: String },
  logo: { type: String },
  metatitle: { type: String },
  metadescription: { type: String },
  adminUrl: { type: String },
  frontUrl: { type: String },
  live: { type: Boolean }
});

module.exports = mongoose.model('Config', ConfigSchema);
