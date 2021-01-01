
const compileData = async function(req, res, next) {

  const photoData = {...req.body};
  const { originalname } = res.uploadData;
  const { public_id, width, height, format, bytes, secure_url } = res.cloudData;

  photoData.project = req.params.projectID;
  photoData.chapter = req.params.chapterID;
  photoData.public_id = public_id;
  photoData.original_file = originalname;
  photoData.width = width;
  photoData.height = height;
  photoData.format = format;
  photoData.size = bytes;
  photoData.url = secure_url;

  res.photoData = photoData;

  next();

}

module.exports = compileData;