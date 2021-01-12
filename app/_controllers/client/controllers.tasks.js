const asyncHandler = require('../middleware/handleAsync');
const Task = require('../../_models/Task');

 /**
 * @route   GET /
 * @desc    read all tasks
 * @access  private
 */

exports.tasks_get = asyncHandler(async function(req, res, next) {

  const { success, count, data } = res.results;
  const { code } = res.locals.current_project;

  return res
    .status(200)
    .render('pages/tasks/index', {
      success: success,
      title: `${code}: tasks`,
      active: { tasks: true },
      count: count,
      tasks: data,

    });

});

 /**
 * @route   GET /add
 * @desc    view task add
 * @access  private
 */

exports.tasks_add = asyncHandler(async function(req, res, next) {

  return res
    .status(200)
    .render('pages/tasks/add', {
      success: true,
      title: 'add task',
      active: { tasks_add: true }
    });

});

 /**
 * @route   GET /:taskID
 * @desc    view one task
 * @access  private
 */

exports.tasks_detail = asyncHandler(async function(req, res, next) {

  const task = await Task.findById(req.params.taskID);

  return res
    .status(200)
    .render('pages/tasks/detail', {
      success: true,
      title: `task ${task.number}`,
      task

    });

});

 /**
 * @route   GET /:taskID/update
 * @desc    update task
 * @access  private
 */

exports.tasks_update = asyncHandler(async function(req, res, next) {

  const task = await Task.findById(req.params.taskID);

  return res
    .status(200)
    .render('pages/tasks/update', {
      success: true,
      title: `update ch ${task.number}`,
      task
    });

});