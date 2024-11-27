import { Router } from 'express';

import { validateAccessToken } from '../middleware/checkAccessToken';
import userService from '../service/userService';
import { ACCESS_TOKEN_NAME } from '../utils/constants';
import tokenService from '../service/tokenService';
import { LocalResponse } from '../middleware/constant';
import {
  getUserInfo,
  getUserRole,
  logoutUser,
} from '../controller/userController';

const userRouter = Router();
userRouter.use(validateAccessToken);
userRouter.get('/info', getUserInfo);

userRouter.get('/role', getUserRole);

userRouter.post('/logout', logoutUser);

export { userRouter };
