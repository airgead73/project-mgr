const mongoose = require('mongoose');
const { cloudinary } = require('../config/cloudinary');

const PhotoSchema = new mongoose.Schema({
  number: {
    type: Number,
    min: 1,
    required: [true, 'Add Photo number.'],
  },
  number_ch: {
    type: Number,
    min: 1,
    required: [true, 'Add Chapter number.'],
  }, 
  type: {
    type: String,
    enum: ['figure', 'photo']
  },
  title: {
    type: String,
    maxlength: [100, 'Caption should be less than 100 characters.']
  },    
  caption: {
    type: String,
    maxlength: [100, 'Caption should be less than 100 characters.'],
  },
  alt: {
    type: String,
    maxlength: [500, 'Alt text should be less than 100 characters.'],
    required: [true, 'Add alt text.'],
  },  
  vendor: {
    type: String,
    maxlength: [100, 'Vendor should be less than 100 characters.']
  },
  credit: {
    type: String,
    maxlength: [500, 'Credit should be less than 100 characters.']
  },
  notes: {
    type: String,
    maxlength: [100, 'Notes should be less than 100 characters.']
  },       
  project: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project',
    required: [true, 'Add project id.'],
  },
  chapter: {
    type: mongoose.Schema.ObjectId,
    ref: 'Chapter',
    required: [true, 'Add chapter id.'],
  },  
  public_id: {
    type: String,
    trim: true
  },
  original_file: {
    type: String,
    trim: true
  },  
  format: {
    type: String,
    trim: true
  }, 
  size: {
    type: String,
    trim: true
  }, 
  url: {
    type: String,
    trim: true
  },
  width: {
    type: Number
  },  
  height: {
    type: Number
  },
  orientation: {
    type: String
  },     
  createdAt: {
    type: Date,
    default: Date.now
  }
});

PhotoSchema.pre('save', function(next) {

  const getOrienation = function(w, h) {

    if(w > h) {
      return  'landscape';
    } else if(w < h) {
      return 'portrait';
    } else {
      return 'square';
    }

  }

  this.orientation = getOrienation(this.width, this.height);

  next();

});

PhotoSchema.pre('remove', { document: true }, function(next) {

  console.log('delete from cloudinary');

  cloudinary.uploader.destroy(`${this.public_id}`, function(error, result) {
    console.log(result, error);
  });

  next();

});

module.exports = mongoose.model('Photo', PhotoSchema);