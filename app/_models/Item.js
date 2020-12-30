const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 100
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project'
  },
  desc: {
    type: String,
    maxlength: 500
  }
});

module.exports = mongoose.model('Item', ItemSchema);