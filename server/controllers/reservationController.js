import Reservation from '../models/Reservation.js';
import Unit from '../models/Unit.js';

// @desc    Create reservation
// @route   POST /api/v1/reservations
export const createReservation = async (req, res, next) => {
  try {
    req.body.user = req.user._id;
    // Set expiration (e.g., 48 hours)
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 48);
    req.body.expiresAt = expiresAt;

    const reservation = await Reservation.create(req.body);
    
    // Update unit status
    await Unit.findByIdAndUpdate(req.body.unit, { status: 'reserved' });

    res.status(201).json({ success: true, data: reservation });
  } catch (error) {
    next(error);
  }
};

// @desc    Get my reservations
// @route   GET /api/v1/reservations/mine
export const getMyReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find({ user: req.user._id }).populate({
      path: 'unit',
      populate: { path: 'development' }
    });
    res.json({ success: true, data: reservations });
  } catch (error) {
    next(error);
  }
};
