const asyncHandler = require('../middleware/handleAsync');
const Photo = require('../../_models/Photo');
const createError = require('http-errors');

/**
 * @route   POST /
 * @desc    create photo
 * @access  private
 */

exports.create = asyncHandler(async function(req, res, next) {

  const photo = new Photo(res.photoData);

  await photo.save();

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: `Photo ${photo.number_ch}.${photo.number} added.`,
      photo
    });

});

 /**
 * @route   GET /
 * @desc    read all photos
 * @access  private
 */

exports.read_all = asyncHandler(async function(req, res, next) {

  const { success, count, data } = res.results;

  return res
    .status(200)
    .json({ 
      success: success,
      count: count,
      message: count > 0 ? `GET: ${count} found`: 'No photos found.',
      photos: data
    });  

}); 

/**
 * @route   GET /:photoID
 * @desc    read one photo
 * @access  private
 */

exports.read_one = asyncHandler(async function(req, res, next) {

  const photo = await Photo.findById(req.params.photoID).populate({
    path: 'chapter',
    select: 'code'
  });

  if(!photo) return next(createError(404, 'photo not found.'));

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: 'GET: read one chapter',
      photo
    });  

}); 


