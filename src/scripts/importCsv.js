const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const csv = require('csv-parser');
require('dotenv').config();
const Position = require('../models/Position');

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(`MongoDB connection error: ${err}`));

const results = [];

const csvFilePath = path.resolve(
  'C:/Users/andyb/Downloads/positionDataset.csv'
);

const convertDataTypes = (data) => {
  const isValidDate = (date) => {
    return !isNaN(Date.parse(date));
  };

  return {
    accrued_interest: data.accrued_interest
      ? parseFloat(data.accrued_interest)
      : undefined,
    number_of_shares: data.number_of_shares
      ? parseInt(data.number_of_shares)
      : undefined,
    balance: data.balance ? parseFloat(data.balance) : undefined,
    capital_gain: data.capital_gain ? parseFloat(data.capital_gain) : undefined,
    cost: data.cost ? parseFloat(data.cost) : undefined,
    currency: data.currency || '',
    entity: data.entity || '',
    expiration_date: isValidDate(data.expiration_date)
      ? new Date(data.expiration_date)
      : undefined,
    initial_date: isValidDate(data.initial_date)
      ? new Date(data.initial_date)
      : undefined,
    interest_rate: data.interest_rate
      ? parseFloat(data.interest_rate)
      : undefined,
    is_nominal: data.is_nominal
      ? data.is_nominal.toLowerCase() === 'true'
      : undefined,
    isin: data.isin || '',
    market: data.market || '',
    name: data.name || '',
    portfolio_id: data.portfolio_id
      ? parseInt(data.portfolio_id, 16)
      : undefined,
    type: data.type || '',
    valuation_date: isValidDate(data.valuation_date)
      ? new Date(data.valuation_date)
      : undefined,
    rate_to_euro: data.rate_to_euro ? parseFloat(data.rate_to_euro) : undefined,
  };
};

const isValidRecord = (record) => {
  return (
    record.number_of_shares !== undefined &&
    record.balance !== undefined &&
    record.currency &&
    record.entity &&
    record.is_nominal !== undefined &&
    record.name &&
    record.portfolio_id !== undefined &&
    record.type &&
    record.rate_to_euro !== undefined
  );
};

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (data) => {
    const convertedData = convertDataTypes(data);
    if (isValidRecord(convertedData)) {
      results.push(convertedData);
    } else {
      console.log(`Invalid record skipped: ${JSON.stringify(convertedData)}`);
    }
  })
  .on('end', async () => {
    try {
      await Position.insertMany(results);
      console.log('Data successfully imported');
      mongoose.connection.close();
    } catch (error) {
      console.error(`Error importing data: ${error}`);
      mongoose.connection.close();
    }
  });
