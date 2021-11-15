import { Router } from 'express'
import * as profileCtrl from '../controllers/profiles.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/

router.use(decodeUserFromToken)

router.get('/', checkAuth, profileCtrl.show);
router.post('/createOrUpdateProfileDestination/user/:userId/dest/:destId', checkAuth, profileCtrl.createOrUpdateProfileDestination);
router.post('/removeProfileDestination/user/:userId/dest/:destId', checkAuth, profileCtrl.removeProfileDestination);




/*---------- Protected Routes ----------*/


export { router }