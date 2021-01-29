import express from 'express';

import {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  checkID,
  checkBody,
} from '../controllers/tourController.js';

export const tourRouter = express.Router();

tourRouter.param('id', checkID);

tourRouter.route('/').get(getAllTours).post(checkBody, createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);
