const mongoose = require('mongoose');

const MilestoneSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: [100, 'Title should be less than 100 characters.'],
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
  }
});

module.exports = mongoose.model('Milestone', MilestoneSchema);