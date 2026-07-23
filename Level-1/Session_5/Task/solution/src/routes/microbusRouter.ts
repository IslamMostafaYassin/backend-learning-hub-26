import { Router } from 'express';
import { validateMicrobus } from '../middleware/validateMiddleware';
import {
  getAllBuses,
  getBusById,
  createBus,
  updateBus,
  deleteBus,
  filterByFare,
  getRatingByRater
} from '../controllers/microbusController';

const router = Router();

router.get('/filter', filterByFare);
router.get('/rate/:id', getRatingByRater);

router.get('/', getAllBuses);
router.get('/:id', getBusById);
router.post('/', validateMicrobus, createBus);
router.put('/:id', validateMicrobus, updateBus);
router.delete('/:id', deleteBus);

export default router;
