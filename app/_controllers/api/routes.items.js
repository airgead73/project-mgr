const { Router } = require('express');
const itemsRouter = Router({ mergeParams: true });
const Item = require('../../_models/Item');

// controller
const {
  read_all,
  read_one
} = require('./controllers.items');

// middleware
const handleQuery = require('../middleware/handleQuery');
const { validationRules, validate } = require('../middleware/handleValidation');

// populate options
populate = [{path: 'project', select: 'title'}]

// routes

itemsRouter
  .route('/')
  .get(handleQuery(Item, populate), read_all);

itemsRouter
  .route('/:itemID')
  .get(read_one);

module.exports = {
  itemsRouter,
};