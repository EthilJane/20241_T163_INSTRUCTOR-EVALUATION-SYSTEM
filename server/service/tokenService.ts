import { where, Op } from 'sequelize';
import { Token } from '../Model/Token';
import {
  decodeToken,
  generateToken,
  verifySystemToken,
} from '../utils/systemToken';
import { create } from 'domain';
import { error } from 'console';
import userService from './userService';

export default {
  async isTokenValid(email: string) {
    return await this.findRefreshToken(email);
  },
  async findRefreshToken(email: string | undefined) {
    if (!email) throw new Error('email is undefined');
    return await Token.findOne({
      where: {
        [Op.and]: {
          username: {
            [Op.eq]: email,
          },
          revoked: false,
          expiredDate: {
            [Op.lt]: new Date(),
          },
        },
      },
      order: [['expiredDate', 'DESC']],
      rejectOnEmpty: true,
    });
  },
  async createRefreshToken(email: string) {
    await Token.update(
      { revoked: true },
      { where: { revoked: false, username: email } }
    );
    let refreshToken = generateToken(email, '30d');
    let expDate = decodeToken(refreshToken)?.exp;
    if (!expDate) throw new Error('invalid expired date');
    await Token.create({
      username: email,
      RefreshToken: refreshToken,
      expiredDate: expDate,
    });
    return refreshToken;
  },
  async invalidateToken(email: string) {
    await Token.update(
      { revoked: true },
      { where: { revoked: false, username: email } }
    );
  },
};
