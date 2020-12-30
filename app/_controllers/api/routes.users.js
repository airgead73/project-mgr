const { Router } = require('express');
const usersRouter = Router();
const User = require('../../_models/User');

// controller
const {
  create,
  read_all,
  read_one,
  update_one,
  update_all,
  delete_one,
  delete_all
} = require('./controllers.users');

// middleware
const handleQuery = require('../middleware/handleQuery');
const { validationRules, validate } = require('../middleware/handleValidation');

usersRouter
  .route('/')
  .get(handleQuery(User), read_all)
  .post(validationRules('createUser'), validate, create)
  .put(update_all)
  .delete(delete_all);

usersRouter
  .route('/:userID')
  .get(read_one)
  .put(update_one)
  .delete(delete_one);

module.exports = {
  usersRouter,
};
