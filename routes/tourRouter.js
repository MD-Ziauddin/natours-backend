import express from 'express';

import {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  aliasTopTours,
} from '../controllers/tourController.js';

export const tourRouter = express.Router();

tourRouter.route('/top-5-cheap').get(aliasTopTours, getAllTours);

tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);
