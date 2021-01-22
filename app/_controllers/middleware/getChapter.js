const Chapter = require('../../_models/Chapter');

const getChapter = async (req, res, next) => {

  const { chapterID } = req.params;

  const chapter = await Chapter.findById(chapterID);

  if(chapterID) {
    res.locals.current_chapter = chapter;
  } else {
    console.log('no specific chapter');
  }

  return next();

}

module.exports = getChapter;