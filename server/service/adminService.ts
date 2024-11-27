import { Op } from 'sequelize';
import { Admin } from '../Model/Admin';
import userService from './userService';

export default {
  async processLogin(logindetails: { username: string; password: string }) {
    let admin = await Admin.findOne({
      where: {
        username: {
          [Op.eq]: logindetails.username,
        },
      },
      rejectOnEmpty: true,
    });
    if (!userService._verifyPassword(logindetails.password, admin.passwordHash))
      throw new Error('Wrong password');

    return admin;
  },
};
