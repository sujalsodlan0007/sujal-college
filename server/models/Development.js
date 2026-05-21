import mongoose from 'mongoose';
import slugify from 'slugify';

const developmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    trim: true,
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  address: {
    line1: String,
    city: String,
    postcode: String,
    country: { type: String, default: 'UK' },
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
  },
  amenities: [String],
  images: [String],
  featuredImage: String,
  developer: String,
  status: {
    type: String,
    enum: ['active', 'hidden', 'archived'],
    default: 'active',
  },
  virtualTourUrl: String,
  videoUrl: String,
  minPrice: Number,
  maxPrice: Number,
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Create development slug from the name
developmentSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Cascade delete units when a development is deleted
developmentSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
  await this.model('Unit').deleteMany({ development: this._id });
  next();
});

// Reverse populate with virtuals
developmentSchema.virtual('units', {
  ref: 'Unit',
  localField: '_id',
  foreignField: 'development',
  justOne: false,
});

const Development = mongoose.model('Development', developmentSchema);
export default Development;
