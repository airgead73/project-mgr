const { Router } = require('express');
const projectsRouter = Router();
const { itemsRouter } = require('./routes.items');
const { resourcesRouter } = require('./routes.resources');
const Project = require('../../_models/Project');

// controllers
const {
  read_all,
  read_one
} = require('./controllers.projects');

// middleware
const handleQuery = require('../middleware/handleQuery');

// populate options
const populate = [{path: 'items', select: 'title'}]

// nested routes
projectsRouter.use('/:projectID/items', itemsRouter);
projectsRouter.use('/:projectID/resources', resourcesRouter);

// routes
projectsRouter
  .route('/')
  .get(handleQuery(Project, populate), read_all);

projectsRouter
  .route('/:projectID')
  .get(read_one);

module.exports = {
  projectsRouter,
};