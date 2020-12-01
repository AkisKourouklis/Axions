const mongoose = require('mongoose');

const { Schema } = mongoose;

const ConfigSchema = new Schema({
  favicon: { type: String },
  logo: { type: String },
  metatitle: { type: String },
  metadescription: { type: String }
});

module.exports = mongoose.model('Config', ConfigSchema);
