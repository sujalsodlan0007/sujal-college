import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  development: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Development',
    required: true,
  },
  unit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Unit',
  },
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
  },
  phone: String,
  message: String,
  status: {
    type: String,
    enum: ['new', 'contacted', 'viewing_scheduled', 'reserved', 'closed', 'lost'],
    default: 'new',
  },
  notes: [{
    text: String,
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
  }],
  source: {
    type: String,
    default: 'website',
  },
}, {
  timestamps: true,
});

const Enquiry = mongoose.model('Enquiry', enquirySchema);
export default Enquiry;
