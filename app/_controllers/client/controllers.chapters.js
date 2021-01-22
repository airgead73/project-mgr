const asyncHandler = require('../middleware/handleAsync');
const Chapter = require('../../_models/Chapter');
const Project = require('../../_models/Project');

 /**
 * @route   GET /
 * @desc    read all chapters
 * @access  private
 */

exports.chapters_get = asyncHandler(async function(req, res, next) {

  const { success, count, data } = res.results;
  const project = await Project.findById(req.params.projectID);

  return res
    .status(200)
    .render('pages/chapters/index', {
      success: success,
      title: `${project.code}: chapters`,
      active: { chapters: true },
      count: count,
      project: project,
      chapters: data,

    });

});

 /**
 * @route   GET /add
 * @desc    view chapter add
 * @access  private
 */

exports.chapters_add = asyncHandler(async function(req, res, next) {

  const project = await Project.findById(req.params.projectID);

  return res
    .status(200)
    .render('pages/chapters/add', {
      success: true,
      title: 'add chapter',
      active: { chapters_add: true },
      project
    });

});

 /**
 * @route   GET /:chapterID
 * @desc    view one chapter
 * @access  private
 */

exports.chapters_detail = asyncHandler(async function(req, res, next) {

  const chapter = await Chapter.findById(req.params.chapterID).populate('photos figures')
  const project = await Project.findById(req.params.projectID);

  console.log("chapter:", chapter);

  return res
    .status(200)
    .render('pages/chapters/detail', {
      success: true,
      title: `chapter ${chapter.number}`,
      chapter,
      project

    });

});

 /**
 * @route   GET /:chapterID/update
 * @desc    update chapter
 * @access  private
 */

exports.chapters_update = asyncHandler(async function(req, res, next) {

  const chapter = await Chapter.findById(req.params.chapterID);

  return res
    .status(200)
    .render('pages/chapters/update', {
      success: true,
      title: `update ch ${chapter.number}`,
      chapter
    });

});