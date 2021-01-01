const { Router } = require('express');
const { landingsRouter } = require('./routes.landing');
const { projectsRouter } = require('./routes.projects');
const { chaptersRouter } = require('./routes.chapters');
const { milestonesRouter } = require('./routes.milestones');
const clientRouter = Router();

clientRouter.use('/', landingsRouter);
clientRouter.use('/projects', projectsRouter);
clientRouter.use('/chapters', chaptersRouter);
clientRouter.use('/milestones', milestonesRouter);

module.exports = {
  clientRouter,
}