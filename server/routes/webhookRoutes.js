import express from 'express';
import { handlePlace3DWebhook, handleCRMWebhook } from '../controllers/webhookController.js';

const router = express.Router();

router.post('/place3d', handlePlace3DWebhook);
router.post('/crm', handleCRMWebhook);

export default router;
