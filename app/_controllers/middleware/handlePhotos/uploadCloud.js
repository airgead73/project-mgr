const { cloudinary } = require('../../../config/cloudinary');
const fs = require('fs');
const Project = require('../../../_models/Project');
const Chapter = require('../../../_models/Chapter');

const uploadCloud = async function(req, res, next) {

  const project = await Project.findById(req.params.projectID);
  const chapter = await Chapter.findById(req.params.chapterID);

  const cloudFile = await cloudinary.uploader.upload('uploads/temp', {
    folder: `projects/${project.code}/ch_${chapter.number}/`,
    tags: 'photos'
  });

  console.log('upload to cloud');

  fs.unlinkSync('uploads/temp');

  res.cloudData = cloudFile;

  next();

}

module.exports = uploadCloud;