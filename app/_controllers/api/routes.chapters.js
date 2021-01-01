const { Router } = require('express');
const chaptersRouter = Router({ mergeParams: true });
const Chapter = require('../../_models/Chapter');

// controller
const {
  create,
  read_all,
  read_one,
  update_one,
  update_all,
  delete_one,
  delete_all
} = require('./controllers.chapters');

// middleware
const handleQuery = require('../middleware/handleQuery');
const { validationRules, validate } = require('../middleware/handleValidation');

// populate options
populate = [{path: 'project', select: 'title'}]

// routes

chaptersRouter
  .route('/')
  .get(handleQuery(Chapter, populate), read_all)
  .post(create)
  .put(update_all)
  .delete(delete_all);

chaptersRouter
  .route('/:chapterID')
  .get(read_one)
  .put(update_one)
  .delete(delete_one);

module.exports = {
  chaptersRouter,
};