import { Request, Response } from 'express';

import {
  generateToken,
  generateTokens,
  verifySystemToken,
} from '../utils/systemToken';
import userService from '../service/userService';
import tokenService from '../service/tokenService';
import { ACCESS_TOKEN_NAME } from '../utils/constants';
import { Sequelize, ValidationError } from 'sequelize';
import { createAccessCookie } from './tokenController';
import adminService from '../service/adminService';
const ErrorHandler = (error: unknown, res: Response) => {
  console.log(error);
  if (error instanceof ValidationError) {
    console.log('sequelize error');
    res.status(401).send({ message: error.message });
    return;
  }
  if (error instanceof Error) {
    res.status(401).send({ message: error.message });
    return;
  }

  res.status(401).send({ message: error });
};
export const loginGmail = async (req: Request, res: Response) => {
  try {
    let cred = req.body.credentials;
    console.log('gmail', cred);
    console.log('continue...');
    let [user, created] = await userService.processGmailLogin(cred);
    await tokenService.createRefreshToken(user.username);
    let accessToken = generateToken(user.username, '15m', user.role);
    createAccessCookie(res, accessToken);
    res.status(200).send({ message: 'access token received', role: user.role });
  } catch (error) {
    ErrorHandler(error, res);
  }
};

export const verifyAuthentication = async (req: Request, res: Response) => {
  try {
    let accessToken = req.cookies[ACCESS_TOKEN_NAME];
    console.log(accessToken);
    if (!accessToken) throw new Error('empty token');
    let tokenTest = verifySystemToken(accessToken);
    await tokenService.findRefreshToken(tokenTest.payload?.email);
    if (tokenTest.valid) {
      console.log('access token is valid');
      res
        .status(200)
        .send({ message: 'access token valid', role: tokenTest.payload?.role });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: 'unauthorized' });
  }
};

export const loginWithEmail = async (req: Request, res: Response) => {
  try {
    let loginDetails = req.body as { email: string; password: string };
    console.log('email_login', loginDetails);
    let user = await userService.processEmailLogin(loginDetails);
    await tokenService.createRefreshToken(loginDetails.email);
    let accessToken = generateToken(loginDetails.email, '15m', user.role);
    createAccessCookie(res, accessToken);
    res.status(200).send({ message: 'access token received', role: user.role });
  } catch (error) {
    ErrorHandler(error, res);
  }
};

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    let loginDetails = req.body as { username: string; password: string };
    console.log('admin_login', loginDetails);
    let admin = await adminService.processLogin(loginDetails);
    await tokenService.createRefreshToken(admin.username);
    let accessToken = generateToken(admin.username, '15m', 'admin');
    createAccessCookie(res, accessToken);
    res.status(200).send({ message: 'access token received', role: 'admin' });
  } catch (error) {
    ErrorHandler(error, res);
  }
};
