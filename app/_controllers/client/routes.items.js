const { Router } = require('express');
const itemsRouter = Router({ mergeParams: true });

// models
const Item = require('../../_models/Item');

// controllers
const {
  items_get,
  items_detail,
  items_add,
  items_update
} = require('./controllers.items');

// middleware
const handleQuery = require('../middleware/handleQuery');

// options
const populate = [{ path: 'items', select: 'title' }];

itemsRouter
  .route('/')
  .get(handleQuery(Item, populate), items_get);

itemsRouter
  .route('/add') 
  .get(items_add); 

  itemsRouter
  .route('/update/:itemID')  
  .get(items_update)  

itemsRouter
  .route('/:itemID')
  .get(items_detail);  

  


module.exports = {
  itemsRouter
}

