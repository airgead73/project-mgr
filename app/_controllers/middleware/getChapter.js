const Chapter = require('../../_models/Chapter');

const getChapter = () => async (req, res, next) => {

let chapter = req.params.chapterID;

if(chapter) {
  chapter = await Chapter.findById(chapter);
  console.log("chapter:", chapter);
  res.current_chapter = chapter;
} else {
  res.current_chapter = null;
}

next();


}

module.exports = getChapter;