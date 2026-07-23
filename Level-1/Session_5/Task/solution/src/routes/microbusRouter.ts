import { Router } from 'express';
import { getAllBuses, getBusById } from '../controllers/microbusController';

const router = Router();

router.get('/', getAllBuses);
router.get('/:id', getBusById);
router.post('/', createBus);
router.put('/:id', updateBus);

export default router;
