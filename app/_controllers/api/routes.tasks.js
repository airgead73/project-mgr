const { Router } = require('express');
const tasksRouter = Router({ mergeParams: true });
const Task = require('../../_models/Task');

// controller
const {
  create,
  read_all,
  read_one,
  update_one,
  update_all,
  delete_one,
  delete_all
} = require('./controllers.tasks');

// middleware
const handleQuery = require('../middleware/handleQuery');
const { validationRules, validate } = require('../middleware/handleValidation');

// populate options
populate = [{path: 'project', select: 'title'}]

// routes

tasksRouter
  .route('/')
  .get(handleQuery(Task, populate), read_all)
  .post(create)
  .put(update_all)
  .delete(delete_all);

tasksRouter
  .route('/:taskID')
  .get(read_one)
  .put(update_one)
  .delete(delete_one);

module.exports = {
  tasksRouter,
};