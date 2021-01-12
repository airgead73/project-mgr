const asyncHandler = require('../middleware/handleAsync');
const Photo = require('../../_models/Photo');
const Chapter = require('../../_models/Chapter');
const Project = require('../../_models/Project');

 /**
 * @route   GET /
 * @desc    read all photos
 * @access  private
 */

exports.photos_get = asyncHandler(async function(req, res, next) {

  const { success, count, data } = res.results;
  const { number } = res.locals.current_chapter

  return res
    .status(200)
    .render('pages/photos/index', {
      success: success,
      title: `Ch ${number}: photos`,
      active: { chapters: true },
      count: count,
      photos: data,

    });

});

 /**
 * @route   GET /add
 * @desc    view photo add
 * @access  private
 */

exports.photos_add = asyncHandler(async function(req, res, next) {

  return res
    .status(200)
    .render('pages/photos/add', {
      success: true,
      title: 'add photo',
      active: { chapters_add: true }
   });

});

 /**
 * @route   GET /:photoID
 * @desc    view one photo
 * @access  private
 */

exports.photos_detail = asyncHandler(async function(req, res, next) {

  const photo = await Photo.findById(req.params.photoID);

  return res
    .status(200)
    .render('pages/photos/detail', {
      success: true,
      title: `photo ${photo.number_ch}.${photo.number}`,
      photo

    });

});

 /**
 * @route   GET /:photoID/update
 * @desc    update photo
 * @access  private
 */

exports.photos_update = asyncHandler(async function(req, res, next) {

  const photo = await Photo.findById(req.params.photoID);

  return res
    .status(200)
    .render('pages/photos/update', {
      success: true,
      title: `update photo ${photo.number_ch}.${photo.number}`,
      photo
    });

});