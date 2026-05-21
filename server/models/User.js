import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false,
  },
  role: {
    type: String,
    enum: ['renter', 'admin', 'operator'],
    default: 'renter',
  },
  phone: String,
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  preferences: {
    budget: Number,
    location: String,
    bedrooms: Number,
    pets: { type: Boolean, default: false },
    parking: { type: Boolean, default: false },
    moveInDate: Date,
  },
  savedDevelopments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Development',
  }],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  verificationToken: String,
}, {
  timestamps: true,
});

// Encrypt password using bcrypt
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
