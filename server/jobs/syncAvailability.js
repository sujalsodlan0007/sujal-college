import cron from 'node-cron';
import { syncAvailabilityFromPMS } from '../services/pmsService.js';

// Sync availability every hour
export const initAvailabilitySync = () => {
  cron.schedule('0 * * * *', async () => {
    console.log('Running Availability Sync Job...');
    await syncAvailabilityFromPMS();
  });
};
