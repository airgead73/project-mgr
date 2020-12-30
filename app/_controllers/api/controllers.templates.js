const asyncHandler = require('../middleware/handleAsync');
//const User = require('../../models/User');
const createError = require('http-errors');

/**
 * @route   POST /
 * @desc    create template
 * @access  private
 */

exports.create = asyncHandler(async function(req, res, next) {

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: 'POST: create template' 
    });

});

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

/**
 * @route   PUT /:templateID
 * @desc    update one template
 * @access  private
 */ 

exports.update_one = asyncHandler(async function(req, res, next) {

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: 'PUT: update one template' 
    });  

}); 

/**
 * @route   DELETE /
 * @desc    delete one template
 * @access  private
 */ 

exports.delete_one = asyncHandler(async function(req, res, next) {

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: 'DELETE: delete template' 
    });  

}); 

/**
 * @route   PUT /
 * @desc    update many templates
 * @access  private
 */ 

exports.update_all = asyncHandler(async function(req, res, next) {

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: 'PUT: update many templates' 
    });  

}); 

/**
 * @route   DELETE /
 * @desc    drop template collection
 * @access  private
 */

exports.delete_all= asyncHandler(async function(req, res, next) {

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: 'DELETE: delete template collection' 
    });  

}); 

