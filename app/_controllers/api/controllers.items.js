const asyncHandler = require('../middleware/handleAsync');
const Item = require('../../_models/Item');
const createError = require('http-errors');

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



