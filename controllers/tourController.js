import { Tour } from '../models/tourModel.js';
import APIFeatures from '../utils/apiFeatures.js';

export const aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

export const getAllTours = async (req, res) => {
  try {
    const feature = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await feature.query;

    res.status(200).json({
      status: 'Success',
      result: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

export const getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'Success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

export const createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'Success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: ' fail',
      message: 'Invalid data sent',
    });
  }
};

export const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: 'Success',
      data: {
        tour,
        runValidators: ture,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: ' fail',
      message: err,
    });
  }
};

export const deleteTour = async (req, res) => {
  await Tour.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'Success',
    data: null,
  });
};
