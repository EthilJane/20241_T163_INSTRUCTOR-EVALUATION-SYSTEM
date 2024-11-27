import express from 'express';

import loginRouter from './router/login';
import authRouter from './router/auth';
import cors from 'cors';
import cookieparser from 'cookie-parser';
import db from './db/database';
db.sync().then(async () => {
  console.log('connected to the database');
  Admin.findOrCreate({
    where: { username: ADMIN_CREDENTIALS.username },
    defaults: {
      username: ADMIN_CREDENTIALS.username,
      passwordHash: ADMIN_CREDENTIALS.password,
    },
  });
  // let [userInfo, crea] = await User.findOrCreate({
  //   where: {
  //     username: {
  //       [Op.eq]: 'heloe',
  //     },
  //   },
  //   defaults: { username: 'heloe' },
  // });
  // console.log('craeted', crea);
});

import { User } from './Model/User';
import { Op, where } from 'sequelize';
import tokenRouter from './router/token';
import instructorRouter from './router/instructor';
import { userRouter } from './router/user';
import { Admin } from './Model/Admin';
import { ADMIN_CREDENTIALS } from './utils/constants';
import { adminRouter } from './router/admin';

const app = express();
const port = 3000;
app.use(cors({ origin: 'http://localhost:8081', credentials: true }));
app.use(cookieparser());
app.use(express.json());
app.use('/login', loginRouter);
app.use('/authetication', authRouter);
app.use('/token', tokenRouter);
app.use('/instructor', instructorRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter);
// app.use('/user', userRouter);
app.get('/', (req, res) => {
  res.send('im good');
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
