import { Router } from 'express';
import * as profileCtrl from '../controllers/profiles.js';
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js';

const router = Router();

/*---------- Public Routes ----------*/

router.use(decodeUserFromToken);

router.get('/', checkAuth, profileCtrl.show);
router.post(
  '/createOrUpdateProfileDestination/user/:userId',
  checkAuth,
  profileCtrl.createOrUpdateProfileDestination
);
router.post(
  '/removeProfileDestination/:destId',
  checkAuth,
  profileCtrl.removeProfileDestination
);

/*---------- Protected Routes ----------*/

export { router };
