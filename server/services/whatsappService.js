import twilio from 'twilio';

const client = process.env.TWILIO_ACCOUNT_SID && 
               process.env.TWILIO_ACCOUNT_SID.startsWith('AC') && 
               process.env.TWILIO_AUTH_TOKEN 
  ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  : null;

export const sendWhatsAppMessage = async (to, body) => {
  if (!client) {
    console.log('Twilio not configured. WhatsApp message suppressed:', body);
    return;
  }

  try {
    await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: `whatsapp:${to}`,
      body,
    });
    console.log(`WhatsApp message sent to ${to}`);
  } catch (error) {
    console.error('WhatsApp Error:', error);
  }
};

export const sendEnquiryNotification = async (phone, name, development) => {
  const message = `New enquiry from ${name} for ${development}. Check admin dashboard for details.`;
  await sendWhatsAppMessage(phone, message);
};
