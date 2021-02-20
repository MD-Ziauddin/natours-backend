import express from 'express';

import {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  aliasTopTours,
} from '../controllers/tourController.js';

import { reviewRouter } from '../routes/reviewRouter.js';

import { protect, restrictTo } from '../controllers/authController.js';

export const tourRouter = express.Router();

tourRouter.route('/top-5-cheap').get(aliasTopTours, getAllTours);

tourRouter
  .route('/')
  .get(protect, getAllTours)
  .post(protect, restrictTo('admin', 'lead-guide'), createTour);
tourRouter
  .route('/:id')
  .get(getTour)
  .patch(protect, restrictTo('admin', 'lead-guide'), updateTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

tourRouter.use('/:tourId/reviews', reviewRouter);
