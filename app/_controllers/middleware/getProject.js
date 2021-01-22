const Project = require('../../_models/Project');

const getProject = async (req, res, next) => {

  const { projectID } = req.params;

  const project = await Project.findById(projectID).populate([
    { path: 'chapters', select: 'number title' }
  ]);

  if(projectID) {
    res.locals.current_project = project;
  } else {
    console.log('no specific project');
  }

  return next();
     
};

module.exports = getProject;