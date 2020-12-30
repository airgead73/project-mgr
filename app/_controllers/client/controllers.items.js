const asyncHandler = require('../middleware/handleAsync');
const Item = require('../../_models/Item');

 /**
 * @route   GET /
 * @desc    read all items
 * @access  private
 */

exports.items_get = asyncHandler(async function(req, res, next) {

  const { success, count, data } = res.results;

  return res
    .status(200)
    .render('pages/items/index', {
      success: success,
      title: 'items',
      count: count,
      items: data,

    });

});

 /**
 * @route   GET /add
 * @desc    view item add
 * @access  private
 */

exports.items_add = asyncHandler(async function(req, res, next) {

  const { projectID } = req.params;

  return res
    .status(200)
    .render('pages/items/add', {
      success: true,
      title: 'add item',      
      projectID: projectID || null
    });

});

 /**
 * @route   GET /:itemID
 * @desc    view one item
 * @access  private
 */

exports.items_detail = asyncHandler(async function(req, res, next) {

  const item = await Item.findById(req.params.itemID)

  return res
    .status(200)
    .render('pages/items/detail', {
      success: true,
      title: `${item.title}`,
      item

    });

});

 /**
 * @route   GET /:itemID/update
 * @desc    update item
 * @access  private
 */

exports.items_update = asyncHandler(async function(req, res, next) {

  const item = await Item.findById(req.params.itemID);

  return res
    .status(200)
    .render('pages/items/update', {
      success: true,
      title: `update ${item.code}`,
      item
    });

});