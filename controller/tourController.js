const Tour = require('../models/tourModel');
const { STATUS } = require('../constant');
const APIfeatures = require('../utils');

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
    res.status(400).json({
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
    res.status(400).json({
      status: STATUS.FAIL,
      message: STATUS.FAIL_MESSAGE,
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
    res.status(400).json({
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
    res.status(400).json({
      status: STATUS.FAIL,
      message: STATUS.FAIL_MESSAGE,
    });
  }
};
