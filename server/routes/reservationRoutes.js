import express from 'express';
import { createReservation, getMyReservations } from '../controllers/reservationController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createReservation);
router.get('/mine', protect, getMyReservations);

export default router;
