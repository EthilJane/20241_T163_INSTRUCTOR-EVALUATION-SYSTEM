import { Router } from 'express';
import {
  loginAdmin,
  loginWithEmail,
  loginGmail,
} from '../controller/authetication';

const router = Router();

router.post('/gmail', loginGmail);
router.post('/email', loginWithEmail);
router.post('/admin', loginAdmin);

export default router;
