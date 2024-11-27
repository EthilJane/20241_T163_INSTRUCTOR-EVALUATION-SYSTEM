import bcrypt from 'bcrypt';
import { User } from '../Model/User';
import { verifyJWTGmail, verifyPayload } from '../utils/verification';
import { Op } from 'sequelize';
import { DEFAULT_PASSWORD } from '../utils/constants';

export default {
  saltRound: 10,
  _verifyPassword(plainPassword: string, hashPass: string) {
    return bcrypt.compareSync(plainPassword, hashPass);
  },
  _hashPassword(plainPassword: string, defaultPass = DEFAULT_PASSWORD) {
    return bcrypt.hashSync(
      plainPassword ? plainPassword : defaultPass,
      this.saltRound
    );
  },
  _identifyRole(email: string) {
    return email.endsWith('@student.buksu.edu.ph') ? 'student' : 'instructor';
  },
  // this will throw an error if the gmail token is not valid
  async processGmailLogin(credentials: string) {
    //this will throw an error if the details are incoreect
    let payload = verifyPayload(await verifyJWTGmail(credentials));
    return await User.findOrCreate({
      where: {
        username: {
          [Op.eq]: payload.email,
        },
      },
      defaults: {
        username: payload.email,
        picture: payload.picture,
        name: payload.name,
      },
    });
  },

  async processEmailLogin(loginDetails: { password: string; email: string }) {
    let user = await User.findOne({
      where: {
        username: {
          [Op.eq]: loginDetails.email,
        },
      },
      attributes: ['passwordHash', 'role', 'username'],
    });

    if (!user)
      throw new Error(
        'Please register first by login in your university account'
      );
    if (!this._verifyPassword(loginDetails.password, user.passwordHash))
      throw new Error('Invalid password');
    return user;
  },
  async getUserInfo(email: string) {
    let user = await User.findOne({
      where: {
        username: {
          [Op.eq]: email,
        },
      },
    });
    return { email: user?.username, name: user?.name, picture: user?.picture };
  },
};
