import AnalyticsEvent from '../models/AnalyticsEvent.js';

// @desc    Track event
// @route   POST /api/v1/analytics/track
export const trackEvent = async (req, res, next) => {
  try {
    if (req.user) req.body.user = req.user._id;
    const event = await AnalyticsEvent.create(req.body);
    res.status(201).json({ success: true, data: event });
  } catch (error) {
    next(error);
  }
};

// @desc    Get dashboard analytics
// @route   GET /api/v1/analytics/dashboard
export const getDashboardAnalytics = async (req, res, next) => {
  try {
    const totalEvents = await AnalyticsEvent.countDocuments();
    const eventBreakdown = await AnalyticsEvent.aggregate([
      { $group: { _id: '$eventType', count: { $sum: 1 } } }
    ]);

    res.json({
      success: true,
      data: {
        totalEvents,
        eventBreakdown
      }
    });
  } catch (error) {
    next(error);
  }
};
