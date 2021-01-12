const asyncHandler = require('../middleware/handleAsync');
const Task = require('../../_models/Task');
const createError = require('http-errors');

/**
 * @route   POST /
 * @desc    create task
 * @access  private
 */

exports.create = asyncHandler(async function(req, res, next) {

  const reqBody = {...req.body};
  reqBody.project = req.params.projectID; 

  const task = new Task(reqBody);

  await task.save();

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: 'New task added.',
      task
    });

});

 /**
 * @route   GET /
 * @desc    read all tasks
 * @access  private
 */

exports.read_all = asyncHandler(async function(req, res, next) {

  const { success, count, data } = res.results;

  return res
    .status(200)
    .json({ 
      success: success,
      count: count,
      message: count > 0 ? `GET: ${count} found`: 'No tasks found.',
      tasks: data
    });  

}); 

/**
 * @route   GET /:taskID
 * @desc    read one task
 * @access  private
 */

exports.read_one = asyncHandler(async function(req, res, next) {

  const task = await Task.findById(req.params.taskID).populate({
    path: 'project',
    select: 'title'
  });

  if(!task) return next(createError(404, 'task not found.'));

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: 'GET: read one task',
      task
    });  

}); 

/**
 * @route   PUT /:taskID
 * @desc    update one task
 * @access  private
 */ 

exports.update_one = asyncHandler(async function(req, res, next) {

  // find task
  let task = await Task.findById(req.params.taskID);

  if(!task) return next(createError(404, 'task not found.'));
  

  // build fields
  const {
    title,
    number,
    notes
  } = req.body;

  const taskFields = {};

  if(title) taskFields.title = title;
  if(notes) taskFields.notes = notes;
  if(number) taskFields.number = number;

  // update task
  task = await Task.findByIdAndUpdate(req.params.taskID, { $set: taskFields }, { new: true });

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: 'PUT: task updated',
      task
    });  

}); 

/**
 * @route   DELETE /
 * @desc    delete one task
 * @access  private
 */ 

exports.delete_one = asyncHandler(async function(req, res, next) {

  // find task
  let task = await Task.findById(req.params.taskID);

  if(!task) {
    return next(createError(404, 'task not found.'));
  }

  // delete task
  await task.remove();

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: `DELETE: ${task.title} is deleted.`
    });   


}); 

/**
 * @route   PUT /
 * @desc    update many tasks
 * @access  private
 */ 

exports.update_all = asyncHandler(async function(req, res, next) {

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: 'PUT: update many tasks' 
    });  

}); 

/**
 * @route   DELETE /
 * @desc    drop task collection
 * @access  private
 */

exports.delete_all= asyncHandler(async function(req, res, next) {

  Task.collection.drop();

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: 'DELETE: delete task collection' 
    });  

}); 

