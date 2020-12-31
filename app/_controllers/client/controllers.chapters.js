const asyncHandler = require('../middleware/handleAsync');
const Chapter = require('../../_models/Chapter');

 /**
 * @route   GET /
 * @desc    read all chapters
 * @access  private
 */

exports.chapters_get = asyncHandler(async function(req, res, next) {

  const { success, count, data } = res.results;

  return res
    .status(200)
    .render('pages/chapters/index', {
      success: success,
      title: 'chapters',
      active: { chapters: true },
      count: count,
      chapters: data,

    });

});

 /**
 * @route   GET /add
 * @desc    view chapter add
 * @access  private
 */

exports.chapters_add = asyncHandler(async function(req, res, next) {

  return res
    .status(200)
    .render('pages/chapters/add', {
      success: true,
      title: 'add chapter',
      active: { chapters_add: true },
    });

});

 /**
 * @route   GET /:chapterID
 * @desc    view one chapter
 * @access  private
 */

exports.chapters_detail = asyncHandler(async function(req, res, next) {

  const chapter = await Chapter.findById(req.params.chapterID);

  return res
    .status(200)
    .render('pages/chapters/detail', {
      success: true,
      title: `chapter ${chapter.number}`,
      chapter

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