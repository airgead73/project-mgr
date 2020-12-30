const { ISDEV } = require('../../config/env');

const errorValidation = (_err, _req, _res, _resWithJson) => {
  if(ISDEV) console.log('validation error');
  let errors = []
  Object.values(_err.errors).forEach(({ properties }) => {
    let error = {}
    error[properties.path] = properties.message;
    errors.push(error);
  });

  return _res  
    .status(err.status || 500)
    .json({
      success: false,
      name: _err.name,
      status: _err.status || 500,
      messages: errors        
    });   
}

const errorDuplicate = (_err, _req, _res, _resWithJson) => {
  if(ISDEV) console.log('duplicate error');
  return _res  
  .status(_err.status || 500)
  .json({
    success: false,
    name: _err.name,
    status: _err.status || 500,
    messages: [
      { email: 'Email is already in use.'}
    ]       
  });   
}

const errorNotFound = (_err, _req, _res, _resWithJson) => {
  if(ISDEV) console.log('not found error');

  if(_resWithJson) {
    return _res  
      .status(_err.status || 500)
      .json({
        success: false,
        name: _err.name,
        status: _err.status || 500,
        messages: [{ resource: _err }]      
      });    
  } else {
    return _res
      .status(_err.status || 500)
      .render('pages/error/error_404', {
        success: false,
        status: _err.status || 500,
        path: _req.path
      });
  }
  
}

const errorSystem = (_err, _req, _res, _resWithJson) => {
  if(ISDEV) console.log('system error');
  return _res  
  .status(_err.status || 500)
  .json({
    success: false,
    name: _err.name,
    status: _err.status || 500,
    messages: [{ system: err.message } ]      
  });      
}

const errorGeneral = (_err, _req, _res, _resWithJson) => {
  if(ISDEV) console.log('general error');
  return _res  
  .status(_err.status || 500)
  .json({
    success: false,
    name: _err.name,
    status: _err.status || 500,
    messages: [{ resource: err }]        
  }); 
}

const handleError = async function(err, req, res, next) {

  console.log(err);

  const resWithJson = req.headers.accept === 'application/json' ? true : false;
  const name = err.name;
  const code = err.code;

  if(name === 'ValidationError') {
    errorValidation(err, req, res, resWithJson);
  } else if(name === 'NotFoundError') {
    errorNotFound(err, req, res, resWithJson);
  } else if(name === 'Error') {
    errorSystem(err, req, res, resWithJson);
  } else if(code === 11000) {
    errorDuplicate(err, req, res, resWithJson);
  } else {
    return res  
      .status(err.status || 500)
      .json({
        success: false,
        name: err.name,
        status: err.status || 500,
        messages: [{ resource: err }]        
      }); 
  }

}

module.exports = handleError;