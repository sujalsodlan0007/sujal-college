import { body } from 'express-validator';

export const registerValidator = [
  body('name', 'Name is required').not().isEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
];

export const loginValidator = [
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password is required').exists(),
];

export const enquiryValidator = [
  body('name', 'Name is required').not().isEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  body('development', 'Development ID is required').not().isEmpty(),
];

export const viewingValidator = [
  body('development', 'Development ID is required').not().isEmpty(),
  body('date', 'Date is required').not().isEmpty(),
  body('time', 'Time is required').not().isEmpty(),
];
