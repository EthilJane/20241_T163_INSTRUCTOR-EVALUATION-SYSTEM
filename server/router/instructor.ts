import { Router } from 'express';

import userService from '../service/userService';
import additionalInfoService from '../service/additionalInfoService';
import { LocalResponse } from '../middleware/constant';
import { checkInstructorAccessToken } from '../middleware/validateUsertypeAccessToken';

const instructorRouter = Router();

instructorRouter.get(
  '/additional-info',
  checkInstructorAccessToken,
  async (req, res) => {
    try {
      let isAccessValid = res.locals[LocalResponse.isAccessValid];
      if (isAccessValid) {
        res.send(
          await additionalInfoService.getEmployeeAdditonalInfo(
            res.locals[LocalResponse.email]
          )
        );
        return;
      }
      throw new Error('access is not valid');
    } catch (error) {
      res.status(401).send({ message: 'access is not valid' });
    }
  }
);

instructorRouter.post(
  '/additional-info',
  checkInstructorAccessToken,
  async (req, res) => {
    try {
      let isAccessValid = res.locals[LocalResponse.isAccessValid];
      if (isAccessValid) {
        let addInfo = {
          ...req.body,
          username: res.locals[LocalResponse.email],
        };
        await additionalInfoService.updateAdditionalInfo(addInfo);
        res.status(200).send({ message: 'updated' });
        return;
      }
      throw new Error('access is not valid');
    } catch (error) {
      console.log(error);
      res.status(401).send({ message: 'error' });
    }
  }
);

export default instructorRouter;
