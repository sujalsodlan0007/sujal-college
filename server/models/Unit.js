import mongoose from 'mongoose';

const unitSchema = new mongoose.Schema({
  development: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Development',
    required: true,
  },
  unitNumber: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['studio', '1-bed', '2-bed', '3-bed', 'penthouse'],
    required: true,
  },
  floor: Number,
  size: Number, // in sqft
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'hold', 'let_agreed', 'reserved', 'coming_soon'],
    default: 'available',
  },
  amenities: [String],
  images: [String],
  availableFrom: Date,
  furnished: { type: Boolean, default: true },
  features: {
    petsAllowed: { type: Boolean, default: false },
    parking: { type: Boolean, default: false },
    balcony: { type: Boolean, default: false },
  },
}, {
  timestamps: true,
});

// Index for faster searching
unitSchema.index({ development: 1, status: 1 });
unitSchema.index({ price: 1 });

const Unit = mongoose.model('Unit', unitSchema);
export default Unit;
