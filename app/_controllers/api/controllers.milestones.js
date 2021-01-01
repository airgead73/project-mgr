const asyncHandler = require('../middleware/handleAsync');
const Milestone = require('../../_models/Milestone');
const createError = require('http-errors');

/**
 * @route   POST /
 * @desc    create milestone
 * @access  private
 */

exports.create = asyncHandler(async function(req, res, next) {

  const reqBody = {...req.body};
  reqBody.project = req.params.projectID; 

  const milestone = new Milestone(reqBody);

  await milestone.save();

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: `milestone ${milestone.number} added.`,
      milestone
    });

});

 /**
 * @route   GET /
 * @desc    read all milestones
 * @access  private
 */

exports.read_all = asyncHandler(async function(req, res, next) {

  const { success, count, data } = res.results;

  return res
    .status(200)
    .json({ 
      success: success,
      count: count,
      message: count > 0 ? `GET: ${count} found`: 'No milestones found.',
      milestones: data
    });  

}); 

/**
 * @route   GET /:milestoneID
 * @desc    read one milestone
 * @access  private
 */

exports.read_one = asyncHandler(async function(req, res, next) {

  const milestone = await Milestone.findById(req.params.milestoneID).populate({
    path: 'project',
    select: 'title'
  });

  if(!milestone) return next(createError(404, 'milestone not found.'));

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: 'GET: read one milestone',
      milestone
    });  

}); 

/**
 * @route   PUT /:milestoneID
 * @desc    update one milestone
 * @access  private
 */ 

exports.update_one = asyncHandler(async function(req, res, next) {

  // find milestone
  let milestone = await Milestone.findById(req.params.milestoneID);

  if(!milestone) return next(createError(404, 'milestone not found.'));
  

  // build fields
  const {
    title,
    number,
    notes
  } = req.body;

  const milestoneFields = {};

  if(title) milestoneFields.title = title;
  if(notes) milestoneFields.notes = notes;
  if(number) milestoneFields.number = number;

  // update milestone
  milestone = await Milestone.findByIdAndUpdate(req.params.milestoneID, { $set: milestoneFields }, { new: true });

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: 'PUT: milestone updated',
      milestone
    });  

}); 

/**
 * @route   DELETE /
 * @desc    delete one milestone
 * @access  private
 */ 

exports.delete_one = asyncHandler(async function(req, res, next) {

  // find milestone
  let milestone = await Milestone.findById(req.params.milestoneID);

  if(!milestone) {
    return next(createError(404, 'milestone not found.'));
  }

  // delete milestone
  await milestone.remove();

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: `DELETE: ${milestone.title} is deleted.`
    });   


}); 

/**
 * @route   PUT /
 * @desc    update many milestones
 * @access  private
 */ 

exports.update_all = asyncHandler(async function(req, res, next) {

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: 'PUT: update many milestones' 
    });  

}); 

/**
 * @route   DELETE /
 * @desc    drop milestone collection
 * @access  private
 */

exports.delete_all= asyncHandler(async function(req, res, next) {

  Milestone.collection.drop();

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: 'DELETE: delete milestone collection' 
    });  

}); 

