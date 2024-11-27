import { NextFunction, Request, Response } from 'express';
import { verifySystemToken } from '../utils/systemToken';
import { ACCESS_TOKEN_NAME } from '../utils/constants';
import { LocalResponse } from './constant';

// export const checkAccessToken = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     let accessToken = req.cookies[ACCESS_TOKEN_NAME];
//     console.log(accessToken);
//     if (!accessToken) return next();
//     let tokenTest = verifySystemToken(accessToken);
//     if (tokenTest.valid) {
//       console.log('access token is valid');
//       res
//         .status(200)
//         .send({ message: 'access token valid', role: tokenTest.payload?.role });
//       return;
//     }
//     throw new Error('invalid token');
//   } catch (error) {
//     console.log('access token is invalid');
//     res.locals.isAccessTokenValid = false;
//     next();
//   }
// };

export const validateAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let accessToken = req.cookies[ACCESS_TOKEN_NAME];
    if (!accessToken) return next();
    let tokenTest = verifySystemToken(accessToken);
    if (tokenTest.valid && tokenTest.payload) {
      console.log('access token is valid');
      res.locals[LocalResponse.isAccessValid] = true;
      res.locals[LocalResponse.email] = tokenTest.payload.email;
      res.locals[LocalResponse.role] = tokenTest.payload.role;
      next();
      return;
    }
    throw new Error('invalid token');
  } catch (error) {
    console.log('access token is invalid');
    res.locals[LocalResponse.isAccessValid] = false;
    next();
  }
};
