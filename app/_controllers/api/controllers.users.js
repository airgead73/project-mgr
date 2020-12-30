const asyncHandler = require('../middleware/handleAsync');
const User = require('../../_models/User');
const createError = require('http-errors');

/**
 * @route   POST /
 * @desc    create user
 * @access  private
 */

exports.create = asyncHandler(async function(req, res, next) {

  if(res.locals.validation_fail) {
    return res
      .status(404)
      .json({
        success: false,
        messages: res.locals.error_arr
      });
  }

  const user = new User(req.body);

  await user.save();

  // Create token
  //const token = user.getSignedJwtToken();

  return res
    .status(200)
    .json({
      success: true,
      msg: 'POST: create user',
      user: {
        name: user.name,
        email: user.email,
      }

  });

});

 /**
 * @route   GET /
 * @desc    read all users
 * @access  private
 */

exports.read_all = asyncHandler(async function(req, res, next) {

  const { success, count, data } = res.results;

  return res
    .status(200)
    .json({ 
      success: success, 
      count: count,
      message: count > 0 ? `GET: ${count} found`: 'No users found.',
      users: data
    });  

}); 

/**
 * @route   GET /:userID
 * @desc    read one user
 * @access  private
 */

exports.read_one = asyncHandler(async function(req, res, next) {

  const user = await User.findById(req.params.userID);

  if(!user) return next(createError(404, 'User not found.'));

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: 'GET: read one user' ,
      user
    });  

}); 

/**
 * @route   PUT /:userID
 * @desc    update one user
 * @access  private
 */ 

exports.update_one = asyncHandler(async function(req, res, next) {

  // find user
  let user = await User.findById(req.params.userID);

  if(!user) {
    return next(createError(404, 'User not found.'));
  }

  // build fields
  const {
    name,
    email
  } = req.body;

  const userFields = {};

  if(name) userFields.name = name;
  if(email) userFields.email = email;

  // update user
  user = await User.findByIdAndUpdate(req.params.userID, { $set: userFields }, { new: true });

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: 'PUT: user updated',
      user
    });  

}); 

/**
 * @route   DELETE /
 * @desc    delete one user
 * @access  private
 */ 

exports.delete_one = asyncHandler(async function(req, res, next) {

  // find user
  let user = await User.findById(req.params.userID);

  if(!user) {
    return next(createError(404, 'User not found.'));
  }

  // delete user
  await user.remove();

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: 'DELETE: user is deleted.' 
    });  

}); 

/**
 * @route   PUT /
 * @desc    update many users
 * @access  private
 */ 

exports.update_all = asyncHandler(async function(req, res, next) {

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: 'PUT: update many users' 
    });  

}); 

/**
 * @route   DELETE /
 * @desc    drop user collection
 * @access  private
 */

exports.delete_all= asyncHandler(async function(req, res, next) {

  User.collection.drop();

  return res
    .status(200)
    .json({ 
      success: true, 
      msg: 'DELETE: delete user collection' 
    });  

}); 

