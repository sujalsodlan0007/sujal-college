import Unit from '../models/Unit.js';

// @desc    Get units for a development
// @route   GET /api/v1/units/development/:developmentId
export const getUnitsByDevelopment = async (req, res, next) => {
  try {
    const units = await Unit.find({ development: req.params.developmentId });
    res.json({ success: true, count: units.length, data: units });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single unit
// @route   GET /api/v1/units/:id
export const getUnit = async (req, res, next) => {
  try {
    const unit = await Unit.findById(req.params.id).populate('development');
    if (!unit) {
      return res.status(404).json({ success: false, message: 'Unit not found' });
    }
    res.json({ success: true, data: unit });
  } catch (error) {
    next(error);
  }
};

// @desc    Create unit
// @route   POST /api/v1/units
export const createUnit = async (req, res, next) => {
  try {
    const unit = await Unit.create(req.body);
    res.status(201).json({ success: true, data: unit });
  } catch (error) {
    next(error);
  }
};

// @desc    Update unit status
// @route   PUT /api/v1/units/:id/status
export const updateUnitStatus = async (req, res, next) => {
  try {
    const unit = await Unit.findByIdAndUpdate(req.params.id, { status: req.body.status }, {
      new: true,
      runValidators: true,
    });
    if (!unit) {
      return res.status(404).json({ success: false, message: 'Unit not found' });
    }
    res.json({ success: true, data: unit });
  } catch (error) {
    next(error);
  }
};
