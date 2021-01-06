const Project = require('../../_models/Project');

const getProject = () => async (req, res, next) => {

  console.log('get project');
  next();

    // let project = req.params.projectID;
    
    // if(project) {
    //   project = await Project.findById(project).populate([{path: 'chapters', select: 'number title'}]);
    //   console.log('project:', project);
    //   res.current_project = project;
    //   return next();
    // } else {
    //   res.current_project = null;
    //   return next();
    // }
     
};

module.exports = getProject;