import express from 'express';

import {
  getAllUser,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';

export const userRouter = express.Router();

userRouter.route('/').get(getAllUser).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
