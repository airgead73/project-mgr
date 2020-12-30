const { Router } = require('express');
const templatesRouter = Router();
const {
  read_all,
  read_one
} = require('./controllers.templates');

templatesRouter
  .route('/')
  .get(read_all);

templatesRouter
  .route('/:templateID')
  .get(read_one);

module.exports = {
  templatesRouter,
};
