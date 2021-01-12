const { Router } = require('express');
const tasksRouter = Router({ mergeParams: true });

// models
const Task = require('../../_models/Task');

// controllers
const {
  tasks_get,
  tasks_detail,
  tasks_add,
  tasks_update
} = require('./controllers.tasks');

// middleware
const handleQuery = require('../middleware/handleQuery');
const getProject = require('../middleware/getProject');
const getChapter = require('../middleware/getChapter');

tasksRouter.get('*', getProject, getChapter);

// options
const populate = [{ path: 'tasks', select: 'number title' }];

tasksRouter
  .route('/')
  .get(handleQuery(Task, populate), tasks_get);

tasksRouter
  .route('/add') 
  .get(tasks_add); 

  tasksRouter
  .route('/update/:taskID')  
  .get(tasks_update)  

tasksRouter
  .route('/:taskID')
  .get(tasks_detail);    


module.exports = {
  tasksRouter
}

