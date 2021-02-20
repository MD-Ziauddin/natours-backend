import express from 'express';

import {
  getAllUser,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
} from '../controllers/userController.js';
import {
  signUp,
  login,
  logout,
  updatePassword,
  protect,
  restrictTo,
} from '../controllers/authController.js';

export const userRouter = express.Router();

userRouter.post('/signup', signUp);
userRouter.post('/login', login);
userRouter.get('/logout', logout);

userRouter.use(protect);

userRouter.patch('/updateMyPassword', updatePassword);
userRouter.patch('/updateMe', updateMe);
userRouter.delete('/deleteMe', deleteMe);
userRouter.get('/me', getMe, getUser);

userRouter.use(restrictTo('admin'));

userRouter.route('/').get(getAllUser).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
