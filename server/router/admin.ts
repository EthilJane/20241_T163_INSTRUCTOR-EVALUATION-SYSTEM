import { Router, Request, Response } from 'express';
import { checkAdminAccessToken } from '../middleware/validateUsertypeAccessToken';
import { LocalResponse } from '../middleware/constant';
import userService from '../service/userService';
import adminService from '../service/adminService';
import evaluationService from '../service/evaluationService';

const adminRouter = Router();

adminRouter.use(checkAdminAccessToken);

adminRouter.post('/evaluation-data', async (req, res) => {
  try {
    let evaluationDetails = req.body;
    let isAccessValid = res.locals[LocalResponse.isAccessValid];
    if (isAccessValid) {
      console.log(evaluationDetails);
      await evaluationService.addOrUpdateEvaluation(evaluationDetails);
      res.status(200).send({ message: 'success' });
      return;
    }
    throw new Error('access is not valid');
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: 'access is not valid' });
  }
});

adminRouter.get('/evaluation-data', async (req, res) => {
  try {
    let evaluationDetails = req.body;
    let isAccessValid = res.locals[LocalResponse.isAccessValid];
    if (isAccessValid) {
      console.log(evaluationDetails);
      res.status(200).send({
        message: 'success',
        data: await evaluationService.getAllEvaluation(),
      });
      return;
    }
    throw new Error('access is not valid');
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: 'access is not valid' });
  }
});
adminRouter.post('/delete/evaluation-data', async (req, res) => {
  try {
    let evaluationDetails = req.body;
    let isAccessValid = res.locals[LocalResponse.isAccessValid];
    if (isAccessValid) {
      console.log(evaluationDetails);
      await evaluationService.deleteEval(evaluationDetails);
      res.status(200).send({
        message: 'success',
      });
      return;
    }
    throw new Error('access is not valid');
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: 'access is not valid' });
  }
});
export { adminRouter };
