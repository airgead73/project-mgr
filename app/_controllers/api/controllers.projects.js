const asyncHandler = require('../middleware/handleAsync');
const Project = require('../../_models/Project');
const createError = require('http-errors');

/**
 * @route   GET /
 * @desc    read all projects
 * @access  private
 */

exports.read_all = asyncHandler(async function(req, res, next) {

  const { success, count, data } = res.results;

  console.log(data)

  return res
    .status(200)
    .json({ 
      success: success,
      count: count,
      message: count > 0 ? `GET: ${count} found`: 'No projects found.',
      projects: data
    });  

}); 

/**
 * @route   GET /:projectID
 * @desc    read one project
 * @access  private
 */

exports.read_one = asyncHandler(async function(req, res, next) {

  const project = await Project.findById(req.params.projectID);

  if(!project) return next(createError(404, 'Project not found.'));

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: 'GET: read one project',
      project
    });  

}); 


