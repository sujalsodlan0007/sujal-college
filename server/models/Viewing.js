import mongoose from 'mongoose';

const viewingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
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
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['in-person', 'virtual'],
    default: 'in-person',
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled', 'no-show'],
    default: 'pending',
  },
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  feedback: String,
}, {
  timestamps: true,
});

const Viewing = mongoose.model('Viewing', viewingSchema);
export default Viewing;
