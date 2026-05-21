import sgMail from '@sendgrid/mail';

if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_API_KEY.startsWith('SG.')) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export const sendEmail = async ({ email, subject, message, templateId, dynamicTemplateData }) => {
  const msg = {
    to: email,
    from: 'no-reply@property-sense.co.uk', // Verified sender
    subject,
    text: message,
    html: message,
    templateId,
    dynamicTemplateData,
  };

  try {
    await sgMail.send(msg);
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error('Email Error:', error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
};

export const sendWelcomeEmail = async (user) => {
  await sendEmail({
    email: user.email,
    subject: 'Welcome to PreLease AI',
    message: `Hi ${user.name}, welcome to the future of PropTech!`,
  });
};

export const sendEnquiryConfirmation = async (enquiry) => {
  await sendEmail({
    email: enquiry.email,
    subject: 'Enquiry Received - Property Sense',
    message: `Hi ${enquiry.name}, we've received your enquiry for ${enquiry.development.name}. Our team will contact you shortly.`,
  });
};
