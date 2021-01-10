const Chapter = require('../../_models/Chapter');

const getChapter = async (req, res, next) => {

  const { chapterID } = req.params;

  console.log("chapter:",chapterID);

  if(req.params.chapterID) {
    console.log('specific chapter');
  } else {
    console.log('no specific chapter');
  }

  return next();

}

module.exports = getChapter;