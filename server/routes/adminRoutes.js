import express from 'express';
import { getAdminMetrics } from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/dashboard', protect, authorize('admin'), getAdminMetrics);

export default router;
