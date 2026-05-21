import Viewing from '../models/Viewing.js';

// @desc    Schedule viewing
// @route   POST /api/v1/viewings
export const scheduleViewing = async (req, res, next) => {
  try {
    req.body.user = req.user._id;
    const viewing = await Viewing.create(req.body);
    res.status(201).json({ success: true, data: viewing });
  } catch (error) {
    next(error);
  }
};

// @desc    Get my viewings
// @route   GET /api/v1/viewings/mine
export const getMyViewings = async (req, res, next) => {
  try {
    const viewings = await Viewing.find({ user: req.user._id }).populate('development unit');
    res.json({ success: true, data: viewings });
  } catch (error) {
    next(error);
  }
};

// @desc    Update viewing status
// @route   PUT /api/v1/viewings/:id/status
export const updateViewingStatus = async (req, res, next) => {
  try {
    const viewing = await Viewing.findByIdAndUpdate(req.params.id, { status: req.body.status }, {
      new: true,
      runValidators: true,
    });
    res.json({ success: true, data: viewing });
  } catch (error) {
    next(error);
  }
};
