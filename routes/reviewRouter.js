import express from 'express';
import { protect, restrictTo } from '../controllers/authController.js';
import {
  createReview,
  getAllReviews,
} from '../controllers/reviewController.js';

export const reviewRouter = express.Router({ mergeParams: true });

reviewRouter.use(protect);

reviewRouter
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user'), createReview);
