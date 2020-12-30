const { Router } = require('express');
const projectsRouter = Router();
const { itemsRouter } = require('./routes.items');

// models
const Project = require('../../_models/Project');

// controllers
const {
  projects_get,
  projects_detail
} = require('./controllers.projects');

// middleware
const handleQuery = require('../middleware/handleQuery');

// populate options
const populate = [{ path: 'items', select: 'title' }];

// nested routes
projectsRouter.use('/:projectID/items', itemsRouter);

// routes
projectsRouter
  .route('/')
  .get(handleQuery(Project, populate), projects_get); 

projectsRouter
  .route('/:projectID')
  .get(projects_detail); 

module.exports = {
  projectsRouter
}

