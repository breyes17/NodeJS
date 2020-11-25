const express = require('express');
const tourController = require('../controller/tourController');

const routes = express.Router();

// routes.param('id', tourController.checkTourId);

routes
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);
routes
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = routes;
