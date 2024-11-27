import { NextFunction, Request, Response } from 'express';
import { ACCESS_TOKEN_NAME } from '../utils/constants';
import { verifySystemToken } from '../utils/systemToken';
import { LocalResponse } from './constant';

export const checkInstructorAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let accessToken = req.cookies[ACCESS_TOKEN_NAME];
    if (!accessToken) return next();
    let tokenTest = verifySystemToken(accessToken);

    if (tokenTest.valid && tokenTest.payload?.role == 'instructor') {
      console.log('instructor access token is valid');
      res.locals[LocalResponse.isAccessValid] = true;
      res.locals[LocalResponse.email] = tokenTest.payload.email;
      next();
      return;
    }
    throw new Error('instructor invalid token');
  } catch (error) {
    console.log('access token is invalid');
    res.locals[LocalResponse.isAccessValid] = false;
    next();
  }
};

export const checkAdminAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let accessToken = req.cookies[ACCESS_TOKEN_NAME];
    if (!accessToken) return next();
    let tokenTest = verifySystemToken(accessToken);

    if (tokenTest.valid && tokenTest.payload?.role == 'admin') {
      console.log('admin access token is valid');
      res.locals[LocalResponse.isAccessValid] = true;
      res.locals[LocalResponse.email] = tokenTest.payload.email;
      next();
      return;
    }
    throw new Error('instructor invalid token');
  } catch (error) {
    console.log('access token is invalid');
    res.locals[LocalResponse.isAccessValid] = false;
    next();
  }
};
