const { Router } = require('express');
const templatesRouter = Router();
const {
  create,
  read_all,
  read_one,
  update_one,
  update_all,
  delete_one,
  delete_all
} = require('./controllers.templates');

templatesRouter
  .route('/')
  .get(read_all)
  .post(create)
  .put(update_all)
  .delete(delete_all);

templatesRouter
  .route('/:templateID')
  .get(read_one)
  .put(update_one)
  .delete(delete_one);

module.exports = {
  templatesRouter,
};
