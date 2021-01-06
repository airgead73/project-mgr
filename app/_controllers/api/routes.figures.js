const { Router } = require('express');
const figuresRouter = Router({ mergeParams: true });
const Figure = require('../../_models/Figure');

// controller
const {
  create,
  read_all,
  read_one
} = require('./controllers.figures');

// middleware
const handleQuery = require('../middleware/handleQuery');
const { validationRules, validate } = require('../middleware/handleValidation');
const handleUpload = require('../middleware/handleImages/handleUpload');
const uploadCloud = require('../middleware/handleImages/uploadCloud');
const handleData = require('../middleware/handleImages/handleData');
const getChapter = require('../middleware/getChapter');

figuresRouter.use(getChapter());

// populate options
populate = [{path: 'chapter', select: 'code'}]

// routes

figuresRouter
  .route('/')
  .get(handleQuery(Figure, populate), read_all)
  .post(
    handleUpload,
    uploadCloud,
    handleData,
    create);

figuresRouter
  .route('/:figureID')
  .get(read_one);

module.exports = {
  figuresRouter,
};