const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
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
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: 'Discount should be lower than the original price',
      },
    },
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
    slug: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual('durationByWeek').get(function () {
  return this.duration / 7; //this.duration is coming from the field
}); // virtual = creating a field without actually saving a field in the database

// MIDDLEWARE
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
