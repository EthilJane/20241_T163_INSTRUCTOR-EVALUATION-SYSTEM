import { Request, Response } from 'express';
import { LocalResponse } from '../middleware/constant';
import userService from '../service/userService';
import tokenService from '../service/tokenService';
import { ACCESS_TOKEN_NAME } from '../utils/constants';

export const getUserInfo = async (req: Request, res: Response) => {
  try {
    let isAccessValid = res.locals[LocalResponse.isAccessValid];
    if (isAccessValid) {
      res.send(await userService.getUserInfo(res.locals[LocalResponse.email]));
      return;
    }
    throw new Error('access is not valid');
  } catch (error) {
    res.status(401).send({ message: 'access is not valid' });
  }
};
export const getUserRole = async (req: Request, res: Response) => {
  try {
    let isAccessValid = res.locals[LocalResponse.isAccessValid];
    if (isAccessValid) {
      res
        .status(200)
        .send({ message: 'role', role: res.locals[LocalResponse.role] });
      return;
    }
    throw new Error('access is not valid');
  } catch (error) {
    res.status(401).send({ message: 'access is not valid' });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    let isAccessValid = res.locals[LocalResponse.isAccessValid];
    if (isAccessValid) {
      await tokenService.invalidateToken(res.locals[LocalResponse.email]);
      res
        .clearCookie(ACCESS_TOKEN_NAME)
        .status(200)
        .send({ message: 'role', role: res.locals[LocalResponse.role] });
      return;
    }
  } catch (error) {
    res.status(401).send({ message: 'couldnt logout user' });
  }
};
