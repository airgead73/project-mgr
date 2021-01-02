const { Router } = require('express');
const photosRouter = Router({ mergeParams: true });

// models
const Photo = require('../../_models/Photo');

// controllers
const {
  photos_get,
  photos_detail,
  photos_add,
  photos_update
} = require('./controllers.photos');

// middleware
const handleQuery = require('../middleware/handleQuery');

// options
const populate = [{ path: 'photos', select: 'number title' }];

photosRouter
  .route('/')
  .get(handleQuery(Photo, populate), photos_get);

photosRouter
  .route('/add') 
  .get(photos_add); 

photosRouter
  .route('/update/:photoID')  
  .get(photos_update)  

photosRouter
  .route('/:photoID')
  .get(photos_detail); 
  
module.exports = {
  photosRouter
}

