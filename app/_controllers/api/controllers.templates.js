const asyncHandler = require('../middleware/handleAsync');
//const User = require('../../models/User');
const createError = require('http-errors');

/**
 * @route   GET /
 * @desc    read all templates
 * @access  private
 */

exports.read_all = asyncHandler(async function(req, res, next) {

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: 'GET: read templates' 
    });  

}); 

/**
 * @route   GET /:templateID
 * @desc    read one template
 * @access  private
 */

exports.read_one = asyncHandler(async function(req, res, next) {

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: 'GET: read one template' 
    });  

}); 


