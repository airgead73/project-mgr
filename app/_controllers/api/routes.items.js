const { Router } = require('express');
const itemsRouter = Router({ mergeParams: true });
const Item = require('../../_models/Item');

// controller
const {
  create,
  read_all,
  read_one,
  update_one,
  update_all,
  delete_one,
  delete_all
} = require('./controllers.items');

// middleware
const handleQuery = require('../middleware/handleQuery');
const { validationRules, validate } = require('../middleware/handleValidation');

// populate options
populate = [{path: 'project', select: 'title'}]

// routes

itemsRouter
  .route('/')
  .get(handleQuery(Item, populate), read_all)
  .post(create)
  .put(update_all)
  .delete(delete_all);

itemsRouter
  .route('/:itemID')
  .get(read_one)
  .put(update_one)
  .delete(delete_one);

module.exports = {
  itemsRouter,
};