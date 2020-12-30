const { Router } = require('express');
const resourcesRouter = Router({ mergeParams: true });
const Resource = require('../../_models/Resource');

// controller
const {
  read_all,
  read_one
} = require('./controllers.resources');

// middleware
const handleQuery = require('../middleware/handleQuery');

// populate options
populate = [{path: 'project', select: 'title'}]

// routes

resourcesRouter
  .route('/')
  .get(handleQuery(Resource, populate), read_all);

resourcesRouter
  .route('/:resourceID')
  .get(read_one);

module.exports = {
  resourcesRouter,
};