import { Router } from 'express';

import indexController from '@controllers/index';

const router = Router();

router.get('/', indexController.index);
router.post('/create', indexController.createUser);

export default router;
