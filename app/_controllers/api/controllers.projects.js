const asyncHandler = require('../middleware/handleAsync');
const Project = require('../../_models/Project');
const createError = require('http-errors');

/**
 * @route   POST /
 * @desc    create project
 * @access  private
 */

exports.create = asyncHandler(async function(req, res, next) {

  console.log(req.body);

  const project = new Project(req.body);

  await project.save();

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: `${project.title} has been added.`,
      project
    });

});

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

/**
 * @route   PUT /:projectID
 * @desc    update one project
 * @access  private
 */ 

exports.update_one = asyncHandler(async function(req, res, next) {

  // find project
  let project = await Project.findById(req.params.projectID);

  if(!project) {
    return next(createError(404, 'project not found.'));
  }

  // build fields
  const {
    title,
    code,
    desc,
    edition,
    client,
  } = req.body;

  const projectFields = {};

  if(title) projectFields.title = title;
  if(code) projectFields.code = code;
  if(desc) projectFields.desc = desc;
  if(edition) projectFields.edition = edition;
  if(client) projectFields.client = client;

  // update project
  project = await Project.findByIdAndUpdate(req.params.projectID, { $set: projectFields }, { new: true });

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: 'PUT: project updated',
      project
    });   

}); 

/**
 * @route   DELETE /
 * @desc    delete one project
 * @access  private
 */ 

exports.delete_one = asyncHandler(async function(req, res, next) {

  // find project
  let project = await Project.findById(req.params.projectID);

  if(!project) {
    return next(createError(404, 'project not found.'));
  }

  // delete project
  await project.remove();

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: 'DELETE: project is deleted.' 
    });   

}); 

/**
 * @route   PUT /
 * @desc    update many projects
 * @access  private
 */ 

exports.update_all = asyncHandler(async function(req, res, next) {

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: 'PUT: update many projects' 
    });  

}); 

/**
 * @route   DELETE /
 * @desc    drop project collection
 * @access  private
 */

exports.delete_all= asyncHandler(async function(req, res, next) {

  Project.collection.drop();

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: 'DELETE: delete project collection' 
    });  

}); 

