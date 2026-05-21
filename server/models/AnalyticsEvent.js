import mongoose from 'mongoose';

const analyticsEventSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  guestId: String,
  eventType: {
    type: String,
    enum: [
      'page_view', 
      'development_view', 
      'unit_click', 
      'virtual_tour_started', 
      'enquiry_started', 
      'enquiry_completed', 
      'viewing_started', 
      'reservation_started', 
      'drop_off'
    ],
    required: true,
  },
  development: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Development',
  },
  unit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Unit',
  },
  metadata: mongoose.Schema.Types.Mixed,
  path: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

analyticsEventSchema.index({ eventType: 1, timestamp: -1 });

const AnalyticsEvent = mongoose.model('AnalyticsEvent', analyticsEventSchema);
export default AnalyticsEvent;
