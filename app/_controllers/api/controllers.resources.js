const asyncHandler = require('../middleware/handleAsync');
const Resource = require('../../_models/Resource');
const createError = require('http-errors');

/**
 * @route   GET /
 * @desc    read all resources
 * @access  private
 */

exports.read_all = asyncHandler(async function(req, res, next) {

  const { success, count, data } = res.results;

  return res
    .status(200)
    .json({ 
      success: success,
      count: count,
      message: count > 0 ? `GET: ${count} found`: 'No resources found.',
      resources: data
    });  

}); 

/**
 * @route   GET /:resourceID
 * @desc    read one resource
 * @access  private
 */

exports.read_one = asyncHandler(async function(req, res, next) {

  const resource = await Resource.findById(req.params.resourceID).populate({
    path: 'project',
    select: 'title'
  });

  if(!resource) return next(createError(404, 'resource not found.'));

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: 'GET: read one resource',
      resource
    });  

}); 

