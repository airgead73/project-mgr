const asyncHandler = require('../middleware/handleAsync');
const Milestone = require('../../_models/Milestone');
const Project = require('../../_models/Project');

 /**
 * @route   GET /
 * @desc    read all milestones
 * @access  private
 */

exports.milestones_get = asyncHandler(async function(req, res, next) {

  const { success, count, data } = res.results;

  return res
    .status(200)
    .render('pages/milestones/index', {
      success: success,
      title: `${project.code}: milestones`,
      active: { milestones: true },
      count: count,
      milestones: data,

    });

});

 /**
 * @route   GET /add
 * @desc    view milestone add
 * @access  private
 */

exports.milestones_add = asyncHandler(async function(req, res, next) {

  return res
    .status(200)
    .render('pages/milestones/add', {
      success: true,
      title: 'add milestone',
      active: { milestones_add: true }
    });

});

 /**
 * @route   GET /:milestoneID
 * @desc    view one milestone
 * @access  private
 */

exports.milestones_detail = asyncHandler(async function(req, res, next) {

  const milestone = await Milestone.findById(req.params.milestoneID);

  return res
    .status(200)
    .render('pages/milestones/detail', {
      success: true,
      title: `milestone ${milestone.number}`,
      milestone

    });

});

 /**
 * @route   GET /:milestoneID/update
 * @desc    update milestone
 * @access  private
 */

exports.milestones_update = asyncHandler(async function(req, res, next) {

  const milestone = await Milestone.findById(req.params.milestoneID);

  return res
    .status(200)
    .render('pages/milestones/update', {
      success: true,
      title: `update ch ${milestone.number}`,
      milestone
    });

});