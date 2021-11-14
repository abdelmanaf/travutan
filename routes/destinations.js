import { Router } from 'express'
import * as destinationsCtrl from './../controllers/destinations.js'

const router = Router()

router.get('/', destinationsCtrl.index)
router.get('/:id', destinationsCtrl.show)
router.post('/', destinationsCtrl.create)
router.delete('/:id', destinationsCtrl.delete)
router.put('/:id', destinationsCtrl.update)

export {
  router
}