import cron from 'node-cron';
import { UserEmployee } from '../modules/User_employee/models/userEmployee.model';

import { sendMail } from '../utils/email'; // your existing utility

//10 PM daily
cron.schedule('* 22 * * *', async () => {
  console.log('Running daily email job at 10 PM');

  try {
    const users = await UserEmployee.findAll({ attributes: ['email', 'name'] });

    for (const user of users) {
      const subject = 'Daily Reminder from DeRestaurant';
      const htmlContent = `
        <p>Hello ${user.name},</p>
        <p>This is your daily update/reminder from DeRestaurant.</p>
        <p>Stay awesome! 🚀</p>
      `;

      await sendMail(user.email, subject, htmlContent);
    }

    console.log(`Emails sent to ${users.length} users`);
  } catch (error) {
    console.error(' Error sending daily emails:', error);
  }
});
