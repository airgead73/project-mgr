const jwt = require('jsonwebtoken');
const User = require('../../_models/User');
const { ISDEV, JWT_SECRET } = require('../../config/env');

const requireAuth = (req, res, next) => {

  // skip check if path is login
  if(req.path === '/login') return next();

  // get cookie
  const token = req.cookies.jwt;

  // check token exists and is valid
  if(token) {

    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if(err) {

        // token not valid
        ISDEV && console.log(err.message);
        return res.status(401).redirect('/login');

      } else {

        // token present and valid
        ISDEV && console.log(decodedToken);
        return next();

      }
    });

  } else {

    // no token
    return res.status(401).redirect('/login');

  }

}

// check current user
const checkUser = (req, res, next) => {

  const token = req.cookies.jwt;

  if(token) {

    jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {
      if(err) {

        // token not valid
        ISDEV && console.log(err.message);
        res.locals.user = null;
        return next();

      } else {

        // token present and valid
        ISDEV && console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        return next();

      }
    });    

  } else {

    res.locals.user = null;
    next();

  }

}

module.exports = {
  requireAuth,
  checkUser
};