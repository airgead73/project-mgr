const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: [500, 'Title should be less than 500 characters.'],
    required: [true, 'Add title.'],
  },
  date: {
    type: Date,
    required: [true, 'Add date.'],
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project',
    required: [true, 'Add project id.'],
  },
  notes: {
    type: String,
    maxlength: [500, 'Description should be less than 500 characters.']
  },
  hours: {
    type: Number
  },
  minutes: {
    type: Number
  }
});

module.exports = mongoose.model('Task', TaskSchema);