const Project = require('../../_models/Project');

const getProject = () => async (req, res, next) => {

    let project = req.params.projectID;
    
    if(project) {
      project = await Project.findById(project).populate([{path: 'chapters', select: 'number title'}]);
      res.current_project = project;
    } else {
      res.current_project = null;
    }
    
    return next();  
};

module.exports = getProject;