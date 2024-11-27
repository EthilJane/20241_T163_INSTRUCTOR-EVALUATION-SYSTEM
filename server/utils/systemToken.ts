import { TokenPayload } from 'google-auth-library';
import { verifyJWTGmail, verifyPayload } from './verification';
import { verify } from 'crypto';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { APP_TOKEN, ROLE } from './constants';
import { jwtDecode } from 'jwt-decode';
import userService from '../service/userService';
type ServerTokenPayload = {
  email: string;
  iat: number;
  exp: number;
  role: ROLE;
};
type payload = {
  email: string;
  role: ROLE;
};
export const generateToken = (
  email: string,
  time: '15m' | '30d' | '1m',
  role?: string
) => {
  return jwt.sign({ email: email, role: role }, APP_TOKEN, { expiresIn: time });
};

export const decodeToken = (token: string) => {
  return jwtDecode(token) as ServerTokenPayload;
};

export const generateTokens = async (credentials: string) => {
  try {
    let payload = verifyPayload(await verifyJWTGmail(credentials));
    return generateToken(payload.email, '15m');
  } catch (error) {
    console.log(error);
  }
};

export function verifySystemToken(token: string): {
  valid: boolean;
  message: 'valid' | 'invalid' | 'expired';
  payload?: ServerTokenPayload;
} {
  try {
    let tokenPayload = jwt.verify(token, APP_TOKEN);
    console.log('payload', tokenPayload);
    return {
      valid: true,
      message: 'valid',
      payload: tokenPayload as ServerTokenPayload,
    };
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      console.error('Token is expired error');
      return { valid: false, message: 'expired' };
    }
    console.error('Token is invalid');
    return { valid: false, message: 'invalid' };
  }
}
