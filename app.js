const express = require('express');
const morgan = require('morgan');

const app = express();
const AppError = require('./utils/appError');
const errorControllerHandler = require('./controller/errorController');
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

// handles unfound routes
app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server.`,
  // });
  next(new AppError(`Can't find ${req.originalUrl} on this server.   sdfsdf`));
});

app.use(errorControllerHandler);

module.exports = app;
