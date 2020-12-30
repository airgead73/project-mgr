const asyncHandler = require('../middleware/handleAsync');
const Project = require('../../_models/Project');

 /**
 * @route   GET /
 * @desc    read all projects
 * @access  private
 */

exports.projects_get = asyncHandler(async function(req, res, next) {

  const { success, count, data } = res.results;

  return res
    .status(200)
    .render('pages/projects/index', {
      success: success,
      title: 'projects',
      active: { projects: true },
      count: count,
      projects: data
    });

});

/**
 * @route   GET /:projectID
 * @desc    view one project
 * @access  private
 */

exports.projects_detail = asyncHandler(async function(req, res, next) {

  const project = await Project.findById(req.params.projectID).populate({path: 'items', select: 'title'});

  console.log(project);

  return res
    .status(200)
    .render('pages/projects/detail', {
      success: true,
      title: `${project.code}`,
      project
    });

});

