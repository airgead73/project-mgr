const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Add title.'],
    maxlength: [100, 'Title should be less than 100 characters.'],
    trim: true
  },
  code: {
    type: String,
    required: [true, 'Add code.'],
    maxlength: [20, 'Code should be less than 20 characters.'],
    trim: true
  },
  edition: {
    type: Number,
    min: 1,
  },
  client: {
    type: String,
    maxlength: [20, 'Code should be less than 20 characters.'],
  },
  desc: {
    type: String,
    maxlength: [500, 'Description should be less than 500 characters.'],
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Reverse populate with virtuals
ProjectSchema.virtual('items', {
  ref: 'Item',
  localField: '_id',
  foreignField: 'project',
  justOne: false
});

ProjectSchema.virtual('chapters', {
  ref: 'Chapter',
  localField: '_id',
  foreignField: 'project',
  justOne: false
});

module.exports = mongoose.model('Project', ProjectSchema);