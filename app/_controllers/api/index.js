const { Router } = require('express');
const { usersRouter } = require('./routes.users');
const { projectsRouter } = require('./routes.projects');
const { chaptersRouter } = require('./routes.chapters');
const { milestonesRouter } = require('./routes.milestones');
const { photosRouter } = require('./routes.photos');
const { figuresRouter } = require('./routes.figures');
const apiRouter = Router();

apiRouter.use('/users', usersRouter);
apiRouter.use('/projects', projectsRouter);
apiRouter.use('/chapters', chaptersRouter);
apiRouter.use('/milestones', milestonesRouter);
apiRouter.use('/photos', photosRouter);
apiRouter.use('/figures', figuresRouter);

module.exports = {
  apiRouter,
};