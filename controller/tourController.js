const Tour = require('../models/tourModel');
const { STATUS } = require('../constant');
const APIfeatures = require('../utils/utils');

exports.getAllTours = async (req, res) => {
  const feature = new APIfeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .fields()
    .pagination();

  const tours = await feature.query;

  try {
    res.status(200).json({
      status: STATUS.SUCCESS,
      length: tours.length,
      data: {
        tours,
      },
    });
  } catch (e) {
    res.status(404).json({
      status: STATUS.FAIL,
      message: STATUS.FAIL_MESSAGE,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      message: STATUS.SUCCESS,
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: STATUS.FAIL,
      message: STATUS.FAIL_MESSAGE,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      message: STATUS.SUCCESS,
      data: newTour,
    });
  } catch (e) {
    res.status(404).json({
      status: STATUS.FAIL,
      message: STATUS.FAIL_MESSAGE,
      data: e,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      message: STATUS.SUCCESS,
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: STATUS.FAIL,
      message: STATUS.FAIL_MESSAGE,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: 'Deleted!',
    });
  } catch (error) {
    res.status(404).json({
      status: STATUS.FAIL,
      message: STATUS.FAIL_MESSAGE,
    });
  }
};

exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: '$difficulty',
          total: { $sum: 1 },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
          avgPrice: { $avg: '$price' },
        },
      },
      {
        $sort: {
          minPrice: 1,
        },
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: { stats },
    });
  } catch (error) {
    res.status(404).json({
      status: STATUS.FAIL,
      message: STATUS.FAIL_MESSAGE,
    });
  }
};

exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1;
    const result = await Tour.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numOfTours: { $sum: 1 },
          name: { $push: '$name' },
        },
      },
      {
        $addFields: { month: '$_id' },
      },
      {
        $project: { _id: 0 },
      },
      {
        $sort: { numOfTours: -1 },
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: { result },
    });
  } catch (error) {
    res.status(404).json({
      status: STATUS.FAIL,
      message: STATUS.FAIL_MESSAGE,
    });
  }
};
