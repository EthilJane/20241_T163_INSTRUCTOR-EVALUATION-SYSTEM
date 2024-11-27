import { Router } from 'express';

import { send } from 'process';
import { ACCESS_TOKEN_NAME } from '../utils/constants';
import tokenService from '../service/tokenService';
import {
  decodeToken,
  generateToken,
  verifySystemToken,
} from '../utils/systemToken';
import { ValidationError } from 'sequelize';
import { refreshToken } from '../controller/tokenController';

const tokenRouter = Router();

// tokenRouter.post('/verify/authenticate');

tokenRouter.post('/refresh', refreshToken);

export default tokenRouter;
