const { Router } = require('express');
const { landingsRouter } = require('./routes.landing');
const { projectsRouter } = require('./routes.projects');
const { chaptersRouter } = require('./routes.chapters');
const { milestonesRouter } = require('./routes.milestones');
const { photosRouter } = require('./routes.photos');
const { figuresRouter } = require('./routes.figures');
const clientRouter = Router();

// middleware
const getProject = require('../middleware/getProject');
const getChapter = require('../middleware/getChapter');

// routes
clientRouter.use('/', landingsRouter);
clientRouter.use('/projects', projectsRouter);
clientRouter.use('/chapters', chaptersRouter);
clientRouter.use('/milestones', milestonesRouter);
clientRouter.use('/photos', photosRouter);
clientRouter.use('/figures', figuresRouter);

module.exports = {
  clientRouter,
}