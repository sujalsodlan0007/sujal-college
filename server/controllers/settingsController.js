import Settings from '../models/Settings.js';

// @desc    Get settings
// @route   GET /api/v1/settings
export const getSettings = async (req, res, next) => {
  try {
    const settings = await Settings.find();
    res.json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
};

// @desc    Update setting
// @route   PUT /api/v1/settings/:key
export const updateSetting = async (req, res, next) => {
  try {
    const setting = await Settings.findOneAndUpdate(
      { key: req.params.key },
      { value: req.body.value, updatedBy: req.user._id },
      { new: true, upsert: true }
    );
    res.json({ success: true, data: setting });
  } catch (error) {
    next(error);
  }
};
