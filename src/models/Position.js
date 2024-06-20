const mongoose = require('mongoose');

const PositionSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  accrued_interest: Number,
  number_of_shares: Number,
  balance: Number,
  capital_gain: Number,
  cost: Number,
  currency: String,
  entity: String,
  expiration_date: Date,
  initial_date: Date,
  interest_rate: Number,
  is_nominal: Boolean,
  isin: String,
  market: String,
  name: String,
  portfolio_id: Number,
  type: String,
  valuation_date: Date,
  rate_to_euro: Number,
});

module.exports = mongoose.model('Position', PositionSchema);
