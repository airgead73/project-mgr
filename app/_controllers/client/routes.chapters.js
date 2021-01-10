const { Router } = require('express');
const chaptersRouter = Router({ mergeParams: true });
const { photosRouter } = require('./routes.photos');
const { figuresRouter } = require('./routes.figures');

// models
const Chapter = require('../../_models/Chapter');

// controllers
const {
  chapters_get,
  chapters_detail,
  chapters_add,
  chapters_update
} = require('./controllers.chapters');

// middleware
const handleQuery = require('../middleware/handleQuery');
const getProject = require('../middleware/getProject');
const getChapter = require('../middleware/getChapter');

chaptersRouter.get('*', getProject, getChapter);

// options
const populate = [{ path: 'chapters', select: 'number title' }];

// nested routes
chaptersRouter.use('/:chapterID/photos', photosRouter);
chaptersRouter.use('/:chapterID/figures', figuresRouter);

// routes
chaptersRouter
  .route('/')
  .get(handleQuery(Chapter, populate), chapters_get);

chaptersRouter
  .route('/add') 
  .get(chapters_add); 

  chaptersRouter
  .route('/update/:chapterID')  
  .get(chapters_update)  

chaptersRouter
  .route('/:chapterID')
  .get(chapters_detail);  

  


module.exports = {
  chaptersRouter
}

