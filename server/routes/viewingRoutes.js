import express from 'express';
import { scheduleViewing, getMyViewings, updateViewingStatus } from '../controllers/viewingController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { viewingValidator } from '../utils/validators.js';
import { validate } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.post('/', protect, viewingValidator, validate, scheduleViewing);
router.get('/mine', protect, getMyViewings);
router.put('/:id/status', protect, authorize('admin', 'operator'), updateViewingStatus);

export default router;
