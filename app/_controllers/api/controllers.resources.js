const asyncHandler = require('../middleware/handleAsync');
const Resource = require('../../_models/Resource');
const createError = require('http-errors');

/**
 * @route   POST /
 * @desc    create resource
 * @access  private
 */

exports.create = asyncHandler(async function(req, res, next) {

  const reqBody = {...req.body};

  reqBody.project = req.params.projectID;

  const resource = new Resource(reqBody);

  await resource.save();

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: 'POST: create resource',
      resource
    });

});

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

/**
 * @route   PUT /:resourceID
 * @desc    update one resource
 * @access  private
 */ 

exports.update_one = asyncHandler(async function(req, res, next) {

  // find resource
  let resource = await Resource.findById(req.params.resourceID);

  if(!resource) return next(createError(404, 'resource not found.'));
  

  // build fields
  const {
    title,
    desc
  } = req.body;

  const resourceFields = {};

  if(title) resourceFields.title = title;
  if(desc) resourceFields.desc = desc;

  // update resource
  resource = await Resource.findByIdAndUpdate(req.params.resourceID, { $set: resourceFields }, { new: true });

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: 'PUT: resource updated',
      resource
    });  

}); 

/**
 * @route   DELETE /
 * @desc    delete one resource
 * @access  private
 */ 

exports.delete_one = asyncHandler(async function(req, res, next) {

  // find resource
  let resource = await Resource.findById(req.params.resourceID);

  if(!resource) {
    return next(createError(404, 'resource not found.'));
  }

  // delete resource
  await resource.remove();

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: `DELETE: ${resource.title} is deleted.`
    });   


}); 

/**
 * @route   PUT /
 * @desc    update many resources
 * @access  private
 */ 

exports.update_all = asyncHandler(async function(req, res, next) {

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: 'PUT: update many resources' 
    });  

}); 

/**
 * @route   DELETE /
 * @desc    drop resource collection
 * @access  private
 */

exports.delete_all= asyncHandler(async function(req, res, next) {

  Resource.collection.drop();

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: 'DELETE: delete resource collection' 
    });  

}); 

