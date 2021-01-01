const { Router } = require('express');
const milestonesRouter = Router({ mergeParams: true });

// models
const Milestone = require('../../_models/Milestone');

// controllers
const {
  milestones_get,
  milestones_detail,
  milestones_add,
  milestones_update
} = require('./controllers.milestones');

// middleware
const handleQuery = require('../middleware/handleQuery');

// options
const populate = [{ path: 'milestones', select: 'number title' }];

milestonesRouter
  .route('/')
  .get(handleQuery(Milestone, populate), milestones_get);

milestonesRouter
  .route('/add') 
  .get(milestones_add); 

  milestonesRouter
  .route('/update/:milestoneID')  
  .get(milestones_update)  

milestonesRouter
  .route('/:milestoneID')
  .get(milestones_detail);  

  


module.exports = {
  milestonesRouter
}

