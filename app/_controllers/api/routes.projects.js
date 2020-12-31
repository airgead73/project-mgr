const { Router } = require('express');
const projectsRouter = Router();
const { chaptersRouter } = require('./routes.chapters');
const { itemsRouter } = require('./routes.items');
const { resourcesRouter } = require('./routes.resources');
const Project = require('../../_models/Project');

// controllers
const {
  create,
  read_all,
  read_one,
  update_one,
  update_all,
  delete_one,
  delete_all
} = require('./controllers.projects');

// middleware
const handleQuery = require('../middleware/handleQuery');

// populate options
const populate = [{path: 'items', select: 'title'}]

// nested routes
projectsRouter.use('/:projectID/chapters', chaptersRouter);
projectsRouter.use('/:projectID/items', itemsRouter);
projectsRouter.use('/:projectID/resources', resourcesRouter);

// routes
projectsRouter
  .route('/')
  .get(handleQuery(Project, populate), read_all)
  .post(create)
  .put(update_all)
  .delete(delete_all);

projectsRouter
  .route('/:projectID')
  .get(read_one)
  .put(update_one)
  .delete(delete_one);

module.exports = {
  projectsRouter,
};