import { Router } from 'express';
import { getAllBuses, getBusById } from '../controllers/microbusController';

const router = Router();

router.get('/', getAllBuses);
router.get('/:id', getBusById);

export default router;
