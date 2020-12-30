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
      links: configureLinks('items'),
      count: count,
      items: data,

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
      links: configureLinks('items'),
      item

    });

});

