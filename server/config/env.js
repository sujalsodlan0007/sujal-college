import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpire: process.env.JWT_EXPIRE || '30d',
  sendgridApiKey: process.env.SENDGRID_API_KEY,
  twilio: {
    sid: process.env.TWILIO_ACCOUNT_SID,
    token: process.env.TWILIO_AUTH_TOKEN,
    whatsappNumber: process.env.TWILIO_WHATSAPP_NUMBER,
  },
  integrations: {
    place3d: process.env.PLACE3D_API_KEY,
    m360: process.env.M360_API_KEY,
    verbaflo: process.env.VERBAFLO_API_KEY,
  },
  urls: {
    client: process.env.CLIENT_URL || 'http://localhost:3000',
    admin: process.env.ADMIN_URL || 'http://localhost:3001',
  }
};
