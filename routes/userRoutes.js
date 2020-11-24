const express = require('express');
const userController = require('../controller/userController');

const routes = express.Router();

routes.param('id', userController.checkUserId);

routes
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
routes
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = routes;
