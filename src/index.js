const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const successMessage = (message) => console.log(`\x1b[32m${message}\x1b[0m`);
const errorMessage = (message) => console.log(`\x1b[31m${message}\x1b[0m`);
const warningMessage = (message) => console.log(`\x1b[33m${message}\x1b[0m`);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => successMessage('MongoDB connected...'))
  .catch((err) => errorMessage(`MongoDB connection error: ${err}`));

const positionRoutes = require('./routes/positionRoutes');
app.use('/api/positions', positionRoutes);

app.listen(PORT, () => {
  successMessage(`Server is running on port ${PORT}`);
});

module.exports = app;
