const { Router } = require('express');
const photosRouter = Router({ mergeParams: true });
const Photo = require('../../_models/Photo');

// controller
const {
  create,
  read_all,
  read_one
} = require('./controllers.photos');

// middleware
const handleQuery = require('../middleware/handleQuery');
const { validationRules, validate } = require('../middleware/handleValidation');
const handleUpload = require('../middleware/handlePhotos/handleUpload');
const uploadCloud = require('../middleware/handlePhotos/uploadCloud');
const handleData = require('../middleware/handlePhotos/handleData');

// populate options
populate = [{path: 'chapter', select: 'code'}]

// routes

photosRouter
  .route('/')
  .get(handleQuery(Photo, populate), read_all)
  .post(
    handleUpload,
    uploadCloud,
    handleData,
    create);

photosRouter
  .route('/:photoID')
  .get(read_one);

module.exports = {
  photosRouter,
};