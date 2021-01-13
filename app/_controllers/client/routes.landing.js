const { Router } = require('express');
const landingsRouter = Router();

// models
const Project = require('../../_models/Project');

// controllers
const {
  landing,
  about,
  contact,
  terms
} = require('./controllers.landing');

const { 
  projects_get 
} = require('./controllers.projects');

// middleware
const handleQuery = require('../middleware/handleQuery');

// populate options
const populate = [
  { path: 'items', select: 'title' },
  { path: 'milestones', select: 'date, title'},
  { path: 'tasks', select: 'data, title'}

];

landingsRouter
  .route('/')
  .get(handleQuery(Project, populate), projects_get);

landingsRouter
  .route('/home')
  .get(landing);  

landingsRouter
  .route('/about')
  .get(about);
  
landingsRouter
  .route('/contact')
  .get(contact); 
  
landingsRouter
  .route('/terms')
  .get(terms);  

module.exports = {
  landingsRouter,
}