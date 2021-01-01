const { Router } = require('express');
const milestonesRouter = Router({ mergeParams: true });
const Milestone = require('../../_models/Milestone');

// controller
const {
  create,
  read_all,
  read_one,
  update_one,
  update_all,
  delete_one,
  delete_all
} = require('./controllers.milestones');

// middleware
const handleQuery = require('../middleware/handleQuery');
const { validationRules, validate } = require('../middleware/handleValidation');

// populate options
populate = [{path: 'project', select: 'title'}]

// routes

milestonesRouter
  .route('/')
  .get(handleQuery(Milestone, populate), read_all)
  .post(create)
  .put(update_all)
  .delete(delete_all);

milestonesRouter
  .route('/:milestoneID')
  .get(read_one)
  .put(update_one)
  .delete(delete_one);

module.exports = {
  milestonesRouter,
};