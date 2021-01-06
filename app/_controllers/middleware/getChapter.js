const Chapter = require('../../_models/Chapter');

const getChapter = () => async (req, res, next) => {

let chapter = req.params.chapterID;

  console.log('get chapter');
  next();

  // if(chapter) {
  //   chapter = await Chapter.findById(chapter);
  //   console.log("chapter:", chapter);
  //   res.current_chapter = chapter;
  //   return next();
  // } else {
  //   res.current_chapter = null;
  //   return next();
  // }

}

module.exports = getChapter;