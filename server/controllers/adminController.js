import User from '../models/User.js';
import Development from '../models/Development.js';
import Unit from '../models/Unit.js';
import Enquiry from '../models/Enquiry.js';

// @desc    Get admin dashboard metrics
// @route   GET /api/v1/admin/dashboard
export const getAdminMetrics = async (req, res, next) => {
  try {
    const totalDevelopments = await Development.countDocuments();
    const totalUnits = await Unit.countDocuments();
    const availableUnits = await Unit.countDocuments({ status: 'available' });
    const enquiriesThisMonth = await Enquiry.countDocuments({
      createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }
    });

    const availabilityByStatus = await Unit.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    res.json({
      success: true,
      data: {
        totalDevelopments,
        totalUnits,
        availableUnits,
        enquiriesThisMonth,
        availabilityByStatus
      }
    });
  } catch (error) {
    next(error);
  }
};
