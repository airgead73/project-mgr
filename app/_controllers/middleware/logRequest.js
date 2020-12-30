const logRequests = function(req, res, next) {

  console.log('\n\n*** new request made ***\n');
  console.log("host: ", req.hostname);
  console.log("path: ", req.path);
  console.log("accepts: ", req.headers.accept);
  console.log("method: ", req.method);
  console.log('\n*** end log ***\n\n'); 
  
  next();

};

module.exports = logRequests;