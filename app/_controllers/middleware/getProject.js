const Project = require('../../_models/Project');

const getProject = async (req, res, next) => {

  const { projectID } = req.params;

  console.log("project:",projectID);

  if(req.params.projectID) {
    console.log('specific project');
  } else {
    console.log('no specific project');
  }

  return next();
     
};

module.exports = getProject;