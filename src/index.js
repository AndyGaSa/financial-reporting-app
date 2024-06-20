const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log(chalk.green('MongoDB connected...')))
  .catch((err) => console.log(chalk.red(`MongoDB connection error: ${err}`)));

const positionRoutes = require('./routes/positionRoutes');
app.use('/api/positions', positionRoutes);

app.listen(PORT, () => {
  console.log(chalk.green(`Server is running on port ${PORT}`));
});

module.exports = app;
