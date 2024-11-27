import { CLIENT_ID, jwtSecret } from './constants/index';
import jwt from 'jsonwebtoken';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { isTokenExpired } from './date';
const client = new OAuth2Client();

export async function verifyJWTGmail(token: string) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });
  return ticket.getPayload();
}
export const verifyPayload = (payload: TokenPayload | undefined) => {
  if (!payload) throw 'no payload';
  if (!payload.email) throw 'no email';
  if (!payload.exp) throw '';
  if (isTokenExpired(payload.exp)) throw 'expired';
  if (!payload.name) throw 'no name';
  return {
    email: payload.email,
    name: payload.name,
    picture: payload.picture || '',
  };
};
