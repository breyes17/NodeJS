const express = require('express');
const morgan = require('morgan');

const app = express();
const userRoutes = require('./routes/userRoutes');
const tourRoutes = require('./routes/tourRoutes');
const { TOURS_URL, USERS_URL } = require('./constant');

//middleware
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use(TOURS_URL, tourRoutes);
app.use(USERS_URL, userRoutes);

module.exports = app;
