const asyncHandler = require('../middleware/handleAsync');
const Figure = require('../../_models/Figure');
const Chapter = require('../../_models/Chapter');
const Project = require('../../_models/Project');

 /**
 * @route   GET /
 * @desc    read all figures
 * @access  private
 */

exports.figures_get = asyncHandler(async function(req, res, next) {

  const { success, count, data } = res.results;
  const project = await Project.findById(req.params.projectID);
  const chapter = await Chapter.findById(req.params.chapterID);

  return res
    .status(200)
    .render('pages/figures/index', {
      success: success,
      title: `Ch ${chapter.number}: figures`,
      active: { chapters: true },
      count: count,
      project: project,
      chapter: chapter,
      figures: data,

    });

});

 /**
 * @route   GET /add
 * @desc    view figure add
 * @access  private
 */

exports.figures_add = asyncHandler(async function(req, res, next) {

  const project = await Project.findById(req.params.projectID);
  const chapter = await Chapter.findById(req.params.chapterID);

  return res
    .status(200)
    .render('pages/figures/add', {
      success: true,
      title: 'add figure',
      active: { chapters_add: true },
      project,
      chapter
    });

});

 /**
 * @route   GET /:figureID
 * @desc    view one figure
 * @access  private
 */

exports.figures_detail = asyncHandler(async function(req, res, next) {

  const figure = await Figure.findById(req.params.figureID);

  return res
    .status(200)
    .render('pages/figures/detail', {
      success: true,
      title: `figure ${figure.number_ch}.${figure.number}`,
      figure

    });

});

 /**
 * @route   GET /:figureID/update
 * @desc    update figure
 * @access  private
 */

exports.figures_update = asyncHandler(async function(req, res, next) {

  const figure = await Figure.findById(req.params.figureID);

  return res
    .status(200)
    .render('pages/figures/update', {
      success: true,
      title: `update figure ${figure.number_ch}.${figure.number}`,
      figure
    });

});