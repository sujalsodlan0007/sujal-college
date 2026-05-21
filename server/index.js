import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/db.js';
import { config } from './config/env.js';
import errorHandler from './middleware/errorMiddleware.js';
import { apiLimiter } from './middleware/rateLimitMiddleware.js';

// Import Routes
import authRoutes from './routes/authRoutes.js';
import developmentRoutes from './routes/developmentRoutes.js';
import unitRoutes from './routes/unitRoutes.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import viewingRoutes from './routes/viewingRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import webhookRoutes from './routes/webhookRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';

// Import Jobs
import { initAvailabilitySync } from './jobs/syncAvailability.js';
import { initViewingReminders } from './jobs/viewingReminderJob.js';
import { initAnalyticsSync } from './jobs/analyticsSyncJob.js';

// Connect to Database
connectDB();

const app = express();

// Security Middleware
app.use(helmet());
app.use(cors({
  origin: [config.urls.client, config.urls.admin],
  credentials: true
}));

// Standard Middleware
app.use(express.json());
app.use(morgan('dev'));

// Apply Rate Limiting
app.use('/api/', apiLimiter);

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/developments', developmentRoutes);
app.use('/api/v1/units', unitRoutes);
app.use('/api/v1/enquiries', enquiryRoutes);
app.use('/api/v1/viewings', viewingRoutes);
app.use('/api/v1/reservations', reservationRoutes);
app.use('/api/v1/analytics', analyticsRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/webhooks', webhookRoutes);
app.use('/api/v1/settings', settingsRoutes);

// Base Route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Property Sense API V1' });
});

// Initialize Cron Jobs
initAvailabilitySync();
initViewingReminders();
initAnalyticsSync();

// Error Handling Middleware
app.use(errorHandler);

const PORT = config.port;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${config.nodeEnv} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
