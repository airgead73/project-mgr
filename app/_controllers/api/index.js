const { Router } = require('express');
const { projectsRouter } = require('./routes.projects');
const { itemsRouter } = require('./routes.items');
const { resourcesRouter } = require('./routes.resources');
const { templatesRouter } = require('./routes.templates');
const apiRouter = Router();

apiRouter.use('/projects', projectsRouter);
apiRouter.use('/items', itemsRouter);
apiRouter.use('/resources', resourcesRouter);
apiRouter.use('/templates', templatesRouter);

module.exports = {
  apiRouter,
};