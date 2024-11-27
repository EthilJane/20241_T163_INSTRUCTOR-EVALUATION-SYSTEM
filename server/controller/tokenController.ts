import { Request, Response } from 'express';
import tokenService from '../service/tokenService';
import { ACCESS_TOKEN_NAME } from '../utils/constants';
import {
  verifySystemToken,
  generateToken,
  decodeToken,
} from '../utils/systemToken';

export const createAccessCookie = (res: Response, accessToken: string) => {
  res.cookie(ACCESS_TOKEN_NAME, accessToken, {
    httpOnly: true, // Ensures the cookie is not accessible via JavaScript
    // secure: true,   // Ensures the cookie is only sent over HTTPS (recommended for production)
    // sameSite: 'strict', // Mitigates CSRF attacks
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
  });
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    console.log('calling refresh');
    let accessToken = req.cookies[ACCESS_TOKEN_NAME];
    let verification = verifySystemToken(accessToken);
    let tokenDecode = decodeToken(accessToken);

    if (verification.message == 'expired') {
      console.log('token is expired in refresh');
      if (!tokenDecode.email) throw new Error('no email');
      await tokenService.findRefreshToken(tokenDecode.email);
      createAccessCookie(
        res,
        generateToken(tokenDecode.email, '15m', tokenDecode.role)
      );
      console.log('refreshing the token');
      res.status(200).send({ message: 'access token refreshed' });
      return;
    } else if (verification.message == 'valid') {
      res.status(200).send({ message: 'access token is still valid' });
      return;
    }
    console.log(verification);
    throw new Error('invalid token');
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: 'token validation error' });
  }
};
