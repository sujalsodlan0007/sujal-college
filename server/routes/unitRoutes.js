import express from 'express';
import { 
  getUnitsByDevelopment, 
  getUnit, 
  createUnit, 
  updateUnitStatus 
} from '../controllers/unitController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/development/:developmentId', getUnitsByDevelopment);
router.get('/:id', getUnit);
router.post('/', protect, authorize('admin', 'operator'), createUnit);
router.put('/:id/status', protect, authorize('admin', 'operator'), updateUnitStatus);

export default router;
