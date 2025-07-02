import { loginUserHandler } from "../controller/auth.controller";
import express from 'express'
const router = express.Router();
router.post('/login',loginUserHandler)
export default router;