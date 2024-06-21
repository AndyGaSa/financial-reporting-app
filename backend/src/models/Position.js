const mongoose = require('mongoose');

const PositionSchema = new mongoose.Schema({
  accrued_interest: Number,
  number_of_shares: { type: Number, required: true },
  balance: { type: Number, required: true },
  capital_gain: Number,
  cost: Number,
  currency: { type: String, required: true },
  entity: { type: String, required: true },
  expiration_date: Date,
  initial_date: Date,
  interest_rate: Number,
  is_nominal: { type: Boolean, required: true },
  isin: String,
  market: String,
  name: { type: String, required: true },
  portfolio_id: { type: Number, required: true },
  type: { type: String, required: true },
  valuation_date: Date,
  rate_to_euro: { type: Number, required: true },
});

module.exports = mongoose.model('Position', PositionSchema);
