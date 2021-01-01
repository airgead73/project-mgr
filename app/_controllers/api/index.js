const { Router } = require('express');
const { usersRouter } = require('./routes.users');
const { projectsRouter } = require('./routes.projects');
const { chaptersRouter } = require('./routes.chapters');
const { milestonesRouter } = require('./routes.milestones');
const apiRouter = Router();

apiRouter.use('/users', usersRouter);
apiRouter.use('/projects', projectsRouter);
apiRouter.use('/chapters', chaptersRouter);
apiRouter.use('/milestones', milestonesRouter);

module.exports = {
  apiRouter,
};