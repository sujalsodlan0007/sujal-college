import express from 'express';
import { createEnquiry, getMyEnquiries, getEnquiries } from '../controllers/enquiryController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { enquiryValidator } from '../utils/validators.js';
import { validate } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.post('/', enquiryValidator, validate, createEnquiry);
router.get('/mine', protect, getMyEnquiries);
router.get('/', protect, authorize('admin', 'operator'), getEnquiries);

export default router;
