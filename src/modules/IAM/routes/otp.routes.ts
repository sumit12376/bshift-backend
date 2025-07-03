import { sendOtp } from '../controller/otp.controller';
import { verify } from '../controller/otp.controller';
import express from 'express'
const router = express.Router();
router.post('/sendOtp',sendOtp )
router.post('/verify',verify)
export default router;