const mongoose = require('mongoose');

const { Schema } = mongoose;
const TransactionSchema = new Schema({
  transaction: {
    value: { type: Number }
  }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
