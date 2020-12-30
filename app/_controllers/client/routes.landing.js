const { Router } = require('express');
const landingsRouter = Router();

// controllers
const {
  landing,
  about,
  contact,
  terms
} = require('./controllers.landing')

landingsRouter
  .route('/')
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