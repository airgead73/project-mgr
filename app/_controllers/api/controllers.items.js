const asyncHandler = require('../middleware/handleAsync');
const Item = require('../../_models/Item');
const createError = require('http-errors');

/**
 * @route   POST /
 * @desc    create item
 * @access  private
 */

exports.create = asyncHandler(async function(req, res, next) {

  const reqBody = {...req.body};

  reqBody.project = req.params.projectID;

  const item = new Item(reqBody);

  await item.save();

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: 'POST: create item',
      item
    });

});

 /**
 * @route   GET /
 * @desc    read all items
 * @access  private
 */

exports.read_all = asyncHandler(async function(req, res, next) {

  const { success, count, data } = res.results;

  return res
    .status(200)
    .json({ 
      success: success,
      count: count,
      message: count > 0 ? `GET: ${count} found`: 'No items found.',
      items: data
    });  

}); 

/**
 * @route   GET /:itemID
 * @desc    read one item
 * @access  private
 */

exports.read_one = asyncHandler(async function(req, res, next) {

  const item = await Item.findById(req.params.itemID).populate({
    path: 'project',
    select: 'title'
  });

  if(!item) return next(createError(404, 'Item not found.'));

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: 'GET: read one item',
      item
    });  

}); 

/**
 * @route   PUT /:itemID
 * @desc    update one item
 * @access  private
 */ 

exports.update_one = asyncHandler(async function(req, res, next) {

  // find item
  let item = await Item.findById(req.params.itemID);

  if(!item) return next(createError(404, 'Item not found.'));
  

  // build fields
  const {
    title,
    desc
  } = req.body;

  const itemFields = {};

  if(title) itemFields.title = title;
  if(desc) itemFields.desc = desc;

  // update item
  item = await Item.findByIdAndUpdate(req.params.itemID, { $set: itemFields }, { new: true });

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: 'PUT: item updated',
      item
    });  

}); 

/**
 * @route   DELETE /
 * @desc    delete one item
 * @access  private
 */ 

exports.delete_one = asyncHandler(async function(req, res, next) {

  // find item
  let item = await Item.findById(req.params.itemID);

  if(!item) {
    return next(createError(404, 'Item not found.'));
  }

  // delete item
  await item.remove();

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: `DELETE: ${item.title} is deleted.`
    });   


}); 

/**
 * @route   PUT /
 * @desc    update many items
 * @access  private
 */ 

exports.update_all = asyncHandler(async function(req, res, next) {

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: 'PUT: update many items' 
    });  

}); 

/**
 * @route   DELETE /
 * @desc    drop item collection
 * @access  private
 */

exports.delete_all= asyncHandler(async function(req, res, next) {

  Item.collection.drop();

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: 'DELETE: delete item collection' 
    });  

}); 

