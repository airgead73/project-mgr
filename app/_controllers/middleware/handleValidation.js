const { body, validationResult } = require('express-validator');

const validationRules = (method) => {

  console.log('validation rules');

  switch(method) {
    case 'createUser':
      return [
        body('name', 'Name is required.').not().isEmpty().trim().escape(),
        body('email', 'Enter a valid email.').isEmail().normalizeEmail().custom(async (value, {req}) => {
          let user = await User.findOne({ email: value });
          if(user) {
            throw new Error('Invalid email [already exists].')
          }
          return true;
        }),
        body('password', 'Password should more than 5 characters and less than 17 characters.').isLength({ min: 6 , max: 16 }),
        body('password_confirm').custom((value, {req}) => {
          if(value !== req.body.password) {
            throw new Error('Password confirmation does not match.')
          }
          return true;
        }) 
      ];
      break; 
    case 'signinUser':
      return [
        body('email', 'Enter valid email.').isEmail().normalizeEmail(),
        body('password', 'Enter a valid password.').isLength({ min: 6 , max: 16 })
      ];
      break; 
  }
}

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    res.locals.validation_fail = false;
    return next();
  }
  const extractedErrors = [];
  console.log(errors);
  errors.array().map(err => extractedErrors.push({ field: err.param, message: err.msg }));
  res.locals.error_arr = extractedErrors;
  res.locals.validation_fail = true;
  return next();
}

module.exports = {
  validationRules,
  validate
}