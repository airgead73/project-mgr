const { Router } = require('express');
const accessRouter = Router();
const multer = require('multer');
const upload = multer();

const {
  get_signup,
  post_signup,
  get_login,
  post_login,
  get_logout
} = require('./controllers.auth');

accessRouter
  .route('/signup')
  .get(get_signup)
  .post(post_signup);

accessRouter
  .route('/login')
  .get(get_login)
  .post(upload.none(), post_login); 
  
accessRouter
  .route('/logout')
  .get(get_logout);   

  module.exports = {
    accessRouter,
  };  