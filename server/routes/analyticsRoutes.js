import express from 'express';
import { trackEvent, getDashboardAnalytics } from '../controllers/analyticsController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/track', trackEvent);
router.get('/dashboard', protect, authorize('admin'), getDashboardAnalytics);

export default router;
