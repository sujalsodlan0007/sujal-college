import express from 'express';
import { 
  getDevelopments, 
  getDevelopmentBySlug, 
  getMatchedDevelopments, 
  createDevelopment, 
  updateDevelopment 
} from '../controllers/developmentController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getDevelopments);
router.get('/matched', protect, getMatchedDevelopments);
router.get('/:slug', getDevelopmentBySlug);
router.post('/', protect, authorize('admin', 'operator'), createDevelopment);
router.put('/:id', protect, authorize('admin', 'operator'), updateDevelopment);

export default router;
