const { Router } = require('express');
const projectsRouter = Router({ mergeParams: true });

// models
const Project = require('../../_models/Project');

// controllers
const {
  projects_get,
  projects_detail,
  projects_add,
  projects_update
} = require('./controllers.projects');

// middleware
const handleQuery = require('../middleware/handleQuery');

// populate options
const populate = [
  { path: 'items', select: 'title' },
  { path: 'milestones', select: 'date, title'},
  { path: 'tasks', select: 'data, title'}

];

// nested routes
const { chaptersRouter } = require('./routes.chapters');
const { milestonesRouter } = require('./routes.milestones');
const { tasksRouter } = require('./routes.tasks');

projectsRouter.use('/:projectID/chapters', chaptersRouter);
projectsRouter.use('/:projectID/milestones', milestonesRouter);
projectsRouter.use('/:projectID/tasks', tasksRouter);

// routes
projectsRouter
  .route('/')
  .get(handleQuery(Project, populate), projects_get);

projectsRouter
  .route('/add') 
  .get(projects_add); 

  projectsRouter
  .route('/update/:projectID')  
  .get(projects_update)  

projectsRouter
  .route('/:projectID')
  .get(projects_detail);    


module.exports = {
  projectsRouter
}

