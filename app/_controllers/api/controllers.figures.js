const asyncHandler = require('../middleware/handleAsync');
const Figure = require('../../_models/Figure');
const createError = require('http-errors');

/**
 * @route   POST /
 * @desc    create figure
 * @access  private
 */

exports.create = asyncHandler(async function(req, res, next) {

  const figure = new Figure(res.imageData);

  await figure.save();

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: `Figure ${figure.number_ch}.${figure.number} added.`,
      figure
    });

});

 /**
 * @route   GET /
 * @desc    read all figures
 * @access  private
 */

exports.read_all = asyncHandler(async function(req, res, next) {

  const { success, count, data } = res.results;

  return res
    .status(200)
    .json({ 
      success: success,
      count: count,
      message: count > 0 ? `GET: ${count} found`: 'No figures found.',
      figures: data
    });  

}); 

/**
 * @route   GET /:figureID
 * @desc    read one figure
 * @access  private
 */

exports.read_one = asyncHandler(async function(req, res, next) {

  const figure = await Figure.findById(req.params.figureID).populate({
    path: 'chapter',
    select: 'code'
  });

  if(!figure) return next(createError(404, 'figure not found.'));

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: 'GET: read one chapter',
      figure
    });  

}); 


