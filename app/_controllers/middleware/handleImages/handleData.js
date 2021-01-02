
const compileData = async function(req, res, next) {

  const imageData = {...req.body};
  const { originalname } = res.uploadData;
  const { public_id, width, height, format, bytes, secure_url } = res.cloudData;

  imageData.project = req.params.projectID;
  imageData.chapter = req.params.chapterID;
  imageData.public_id = public_id;
  imageData.original_file = originalname;
  imageData.width = width;
  imageData.height = height;
  imageData.format = format;
  imageData.size = bytes;
  imageData.url = secure_url;

  res.imageData = imageData;

  next();

}

module.exports = compileData;