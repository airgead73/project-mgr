const asyncHandler = require('../middleware/handleAsync');
const Chapter = require('../../_models/Chapter');
const createError = require('http-errors');

/**
 * @route   POST /
 * @desc    create chapter
 * @access  private
 */

exports.create = asyncHandler(async function(req, res, next) {

  const reqBody = {...req.body};
  reqBody.project = req.params.projectID; 

  const chapter = new Chapter(reqBody);

  await chapter.save();

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: `Chapter ${chapter.number} added.`,
      chapter
    });

});

 /**
 * @route   GET /
 * @desc    read all chapters
 * @access  private
 */

exports.read_all = asyncHandler(async function(req, res, next) {

  const { success, count, data } = res.results;

  return res
    .status(200)
    .json({ 
      success: success,
      current_project: res.current_project,
      count: count,
      message: count > 0 ? `GET: ${count} found`: 'No chapters found.',
      chapters: data
    });  

}); 

/**
 * @route   GET /:chapterID
 * @desc    read one chapter
 * @access  private
 */

exports.read_one = asyncHandler(async function(req, res, next) {

  const chapter = await Chapter.findById(req.params.chapterID).populate({
    path: 'project',
    select: 'title'
  });

  if(!chapter) return next(createError(404, 'chapter not found.'));

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: 'GET: read one chapter',
      chapter
    });  

}); 

/**
 * @route   PUT /:chapterID
 * @desc    update one chapter
 * @access  private
 */ 

exports.update_one = asyncHandler(async function(req, res, next) {

  // find chapter
  let chapter = await Chapter.findById(req.params.chapterID);

  if(!chapter) return next(createError(404, 'chapter not found.'));
  

  // build fields
  const {
    title,
    number,
    notes
  } = req.body;

  const chapterFields = {};

  if(title) chapterFields.title = title;
  if(notes) chapterFields.notes = notes;
  if(number) chapterFields.number = number;

  // update chapter
  chapter = await Chapter.findByIdAndUpdate(req.params.chapterID, { $set: chapterFields }, { new: true });

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: 'PUT: chapter updated',
      chapter
    });  

}); 

/**
 * @route   DELETE /
 * @desc    delete one chapter
 * @access  private
 */ 

exports.delete_one = asyncHandler(async function(req, res, next) {

  // find chapter
  let chapter = await Chapter.findById(req.params.chapterID);

  if(!chapter) {
    return next(createError(404, 'chapter not found.'));
  }

  // delete chapter
  await chapter.remove();

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: `DELETE: ${chapter.title} is deleted.`
    });   


}); 

/**
 * @route   PUT /
 * @desc    update many chapters
 * @access  private
 */ 

exports.update_all = asyncHandler(async function(req, res, next) {

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: 'PUT: update many chapters' 
    });  

}); 

/**
 * @route   DELETE /
 * @desc    drop chapter collection
 * @access  private
 */

exports.delete_all= asyncHandler(async function(req, res, next) {

  Chapter.collection.drop();

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: 'DELETE: delete chapter collection' 
    });  

}); 

