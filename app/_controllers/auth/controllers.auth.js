const asyncHandler = require('../middleware/handleAsync');
const User = require('../../_models/User');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, ISDEV } = require('../../config/env');

/**
 * @route   GET /
 * @desc    view signup page
 * @access  private
 */

exports.get_signup = asyncHandler(async function(req, res, next) {  

  return res
    .status(200)
    .render('pages/signup', {
      success: true,
      title: 'signup',
      scripts: {
        signup: true
      }
    });

});

exports.get_login = asyncHandler(async function(req, res, next) {

  return res
    .status(200)
    .render('pages/login', {
      success: true,
      title: 'login',
      scripts: {
        login: true
      }
    });

});

exports.get_logout = asyncHandler(async function(req, res, next) {

  res.cookie('jwt', '', { maxAge: 1});
  res.redirect('/login');

});

exports.post_signup = asyncHandler(async function(req, res, next) {

  const { name, email, password } = req.body;

  const user = await User.create({ name, email, password});

  return res
    .status(201)
    .json({
      success: true,
      user: user._id
    });

});

exports.post_login = asyncHandler(async function(req, res, next) {

  const cookieOptions = {
    httpOnly: true,
    maxAge: 3 * 24 * 60 * 60 * 1000,
    secure: ISDEV ? false : true
  }

  const { email, password } = req.body;  

  try {

    const user = await User.login({ email, password }, next);
    const token = user.getToken();

    return res  
      .status(200)
      .cookie('jwt', token, cookieOptions)
      .json({
        success: true
      });

  } catch(err) {

    ISDEV && console.log(err);

    return res
      .status(400)
      .json({
        success: false,
        messages: [
          { authentication: 'Email and password combination does not match.'  }
        ]
      });
  } 

});