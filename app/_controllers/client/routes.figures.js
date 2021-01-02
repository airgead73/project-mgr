const { Router } = require('express');
const figuresRouter = Router({ mergeParams: true });

// models
const Figure = require('../../_models/Figure');

// controllers
const {
  figures_get,
  figures_detail,
  figures_add,
  figures_update
} = require('./controllers.figures');

// middleware
const handleQuery = require('../middleware/handleQuery');

// options
const populate = [{ path: 'figures', select: 'number title' }];

figuresRouter
  .route('/')
  .get(handleQuery(Figure, populate), figures_get);

figuresRouter
  .route('/add') 
  .get(figures_add); 

figuresRouter
  .route('/update/:figureID')  
  .get(figures_update)  

figuresRouter
  .route('/:figureID')
  .get(figures_detail); 
  
module.exports = {
  figuresRouter
}

