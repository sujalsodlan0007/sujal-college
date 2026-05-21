import Enquiry from '../models/Enquiry.js';
import { sendEnquiryConfirmation } from '../services/emailService.js';
import { sendEnquiryNotification } from '../services/whatsappService.js';

// @desc    Create enquiry
// @route   POST /api/v1/enquiries
export const createEnquiry = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.create(req.body);
    const populatedEnquiry = await Enquiry.findById(enquiry._id).populate('development');

    // Notifications
    await sendEnquiryConfirmation(populatedEnquiry);
    // Assuming admin phone is in settings
    // await sendEnquiryNotification(adminPhone, enquiry.name, populatedEnquiry.development.name);

    res.status(201).json({ success: true, data: enquiry });
  } catch (error) {
    next(error);
  }
};

// @desc    Get my enquiries
// @route   GET /api/v1/enquiries/mine
export const getMyEnquiries = async (req, res, next) => {
  try {
    const enquiries = await Enquiry.find({ email: req.user.email }).populate('development');
    res.json({ success: true, data: enquiries });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all enquiries (Admin)
// @route   GET /api/v1/enquiries
export const getEnquiries = async (req, res, next) => {
  try {
    const enquiries = await Enquiry.find().populate('development');
    res.json({ success: true, data: enquiries });
  } catch (error) {
    next(error);
  }
};
