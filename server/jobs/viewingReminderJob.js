import cron from 'node-cron';
import Viewing from '../models/Viewing.js';
import { sendEmail } from '../services/emailService.js';

// Send reminders for viewings scheduled for tomorrow
export const initViewingReminders = () => {
  cron.schedule('0 9 * * *', async () => {
    console.log('Running Viewing Reminders Job...');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0,0,0,0);

    const nextDay = new Date(tomorrow);
    nextDay.setDate(nextDay.getDate() + 1);

    const viewings = await Viewing.find({
      date: { $gte: tomorrow, $lt: nextDay },
      status: 'confirmed'
    }).populate('user development');

    for (const viewing of viewings) {
      await sendEmail({
        email: viewing.user.email,
        subject: 'Reminder: Your Viewing Tomorrow',
        message: `Hi ${viewing.user.name}, this is a reminder for your viewing at ${viewing.development.name} tomorrow at ${viewing.time}.`
      });
    }
  });
};
