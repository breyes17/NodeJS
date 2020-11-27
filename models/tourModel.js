const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'Must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'Must have a group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'Must have a difficulty'],
  },
  ratingsAverage: {
    type: Number,
    default: 6.9,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'Must have a summary'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'Must have an image cover'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false, //hide in the API
  },
  startDates: [Date],
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
