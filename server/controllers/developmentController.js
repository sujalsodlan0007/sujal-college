import Development from '../models/Development.js';
import APIFeatures from '../utils/apiFeatures.js';
import { calculateMatchScore } from '../utils/matchingEngine.js';

// @desc    Get all developments
// @route   GET /api/v1/developments
export const getDevelopments = async (req, res, next) => {
  try {
    const features = new APIFeatures(Development.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const developments = await features.query.populate('units');
    res.json({ success: true, count: developments.length, data: developments });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single development by slug
// @route   GET /api/v1/developments/:slug
export const getDevelopmentBySlug = async (req, res, next) => {
  try {
    const development = await Development.findOne({ slug: req.params.slug }).populate('units');
    if (!development) {
      return res.status(404).json({ success: false, message: 'Development not found' });
    }
    res.json({ success: true, data: development });
  } catch (error) {
    next(error);
  }
};

// @desc    Get matched developments based on user preferences
// @route   GET /api/v1/developments/matched
export const getMatchedDevelopments = async (req, res, next) => {
  try {
    const developments = await Development.find({ status: 'active' }).populate('units');
    const userPrefs = req.user.preferences;

    const matched = developments.map(dev => {
      const score = calculateMatchScore(userPrefs, dev);
      return { ...dev.toObject(), matchScore: score };
    }).sort((a, b) => b.matchScore - a.matchScore);

    res.json({ success: true, data: matched });
  } catch (error) {
    next(error);
  }
};

// @desc    Create development
// @route   POST /api/v1/developments
export const createDevelopment = async (req, res, next) => {
  try {
    const development = await Development.create(req.body);
    res.status(201).json({ success: true, data: development });
  } catch (error) {
    next(error);
  }
};

// @desc    Update development
// @route   PUT /api/v1/developments/:id
export const updateDevelopment = async (req, res, next) => {
  try {
    const development = await Development.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!development) {
      return res.status(404).json({ success: false, message: 'Development not found' });
    }
    res.json({ success: true, data: development });
  } catch (error) {
    next(error);
  }
};
