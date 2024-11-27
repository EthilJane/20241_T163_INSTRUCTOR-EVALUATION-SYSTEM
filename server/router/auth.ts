import { Router } from 'express';
import { verifyAuthentication } from '../controller/authetication';

const router = Router();

router.post('/verify', verifyAuthentication);

// router.get('/gmail', verifyUser);

export default router;
